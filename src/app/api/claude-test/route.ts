import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";


export const maxDuration = 60;

// One line of the NDJSON response sent to the browser.
type StreamLine =
    | {
          type: "status";
          stage: "started";
          model: string;
          inputTokens: number;
          cacheCreationTokens: number;
          cacheReadTokens: number;
      }
    | { type: "status"; stage: "thinking" }
    | { type: "status"; stage: "notes" | "drawing"; shapes: number }
    | {
          type: "status";
          stage: "finishing";
          stopReason: string | null;
          outputTokens: number;
      }
    | { type: "done"; sentMessage: string; content: unknown }
    | { type: "error"; error: string };

export async function POST(request: Request) {
    const apiKey = process.env.CLAUDE_API_TOKEN;
    if (!apiKey) {
        return NextResponse.json(
            { error: "CLAUDE_API_TOKEN is not configured" },
            { status: 500 },
        );
    }

    const { message } = (await request.json()) as { message: string };

    const client = new Anthropic({ apiKey });


    const SYSTEM_PROMPT = `You turn client telemetry into a clean, recognisable SVG illustration.

INPUT
The user message is telemetry: device type, brand, and a city/country.

OUTPUT FORMAT (strict)
1. <notes>1-2 sentences: what you detected and which landmark you chose.</notes>
2. <svg>...</svg> containing exactly one complete SVG.
Output nothing outside these two tags. No markdown fences.

SCENE COMPOSITION
- Background: Two iconic landmarks from the city. Focus on the SILHOUETTE - the shape that makes it instantly recognizable.
- Foreground: The user's device (laptop for desktop, phone for mobile).
- Device should be positioned bottom left, center or right - you decide, partially overlapping the landmark scene.

LANDMARK DRAWING STRATEGY (CRITICAL)
For recognizable landmarks, capture the KEY SILHOUETTE FEATURES:
- Sydney Opera House: 3-4 overlapping sail/shell shapes using smooth bezier curves, sitting on a rectangular platform over water
- Eiffel Tower: distinctive tapered lattice shape with 3 tiers and pointed top
- Big Ben: tall rectangular clock tower with pointed spire and clock face
- Statue of Liberty: figure holding torch aloft with crown spikes visible
- Golden Gate Bridge: two towers with characteristic suspension cables
- Taj Mahal: central onion dome flanked by smaller domes and minarets
Always draw the most DISTINCTIVE outline that makes the landmark identifiable at a glance.

STYLE
- Clean monoline line drawing (like a minimal logo or icon). Outlines only, no filled shapes.
- Smooth bezier curves (C/S commands) for organic shapes, clean lines for geometric shapes.
- Strokes: stroke-linecap="round" stroke-linejoin="round", stroke-width 4-7.
- Every element MUST have fill="none". Never use a fill colour, gradients, or shading.
- Use one color only - rgb(25, 25, 25).
- Background is transparent.

SVG REQUIREMENTS
- viewBox="0 0 400 400" with xmlns. No width/height attributes.
- Max 40 drawable elements total.
- Use <path>, <circle>, <ellipse>, <rect>, <line>, <g>.
- Paths can have up to 15 commands each - use enough to capture landmark shapes properly.
- Inline all styles as attributes (fill, stroke, stroke-width). No <style>, class, <defs>, <use>, <clipPath>, <mask>, <text>, or <image>.
- Round coordinates to 1 decimal place.
- Group elements logically: <g id="landmark">, <g id="device">.`;

    const claudeStream = client.messages.stream({
        max_tokens: 6000,
        messages: [{ content: message, role: "user" }],
        system: [
            {
                type: "text",
                text: SYSTEM_PROMPT,
                cache_control: { type: "ephemeral" },
            },
        ],
        model: "claude-sonnet-5-5",
    });

    // Stop generating tokens if the browser goes away.
    request.signal.addEventListener("abort", () => claudeStream.abort());

    const encoder = new TextEncoder();

    const body = new ReadableStream<Uint8Array>({
        async start(controller) {
            // One JSON object per line (NDJSON).
            const send = (line: StreamLine) => {
                try {
                    controller.enqueue(
                        encoder.encode(`${JSON.stringify(line)}\n`),
                    );
                } catch {
                    // Controller already closed (client disconnected).
                }
            };

            let text = "";
            let stage: "notes" | "drawing" | null = null;
            let shapes = 0;

            try {
                for await (const event of claudeStream) {
                    // Raw Claude event, so it can be inspected in the terminal.
                    // console.log("[claude-stream]", JSON.stringify(event));

                    if (event.type === "message_start") {
                        const usage = event.message.usage;
                        send({
                            type: "status",
                            stage: "started",
                            model: event.message.model,
                            inputTokens: usage.input_tokens,
                            cacheCreationTokens:
                                usage.cache_creation_input_tokens ?? 0,
                            cacheReadTokens: usage.cache_read_input_tokens ?? 0,
                        });
                    } else if (
                        event.type === "content_block_start" &&
                        (event.content_block.type === "thinking" ||
                            event.content_block.type === "redacted_thinking")
                    ) {
                        // The model thinks before it writes any text, which
                        // is where most of the silent wait comes from.
                        send({ type: "status", stage: "thinking" });
                    } else if (
                        event.type === "content_block_delta" &&
                        event.delta.type === "text_delta"
                    ) {
                        text += event.delta.text;

                        const nextStage = text.includes("<svg")
                            ? "drawing"
                            : "notes";
                        const nextShapes = (
                            text.match(/<(path|circle|ellipse|rect|line)\b/g) ??
                            []
                        ).length;

                        // Only send when something visible changed.
                        if (nextStage !== stage || nextShapes !== shapes) {
                            stage = nextStage;
                            shapes = nextShapes;
                            send({ type: "status", stage, shapes });
                        }
                    } else if (event.type === "message_delta") {
                        send({
                            type: "status",
                            stage: "finishing",
                            stopReason: event.delta.stop_reason,
                            outputTokens: event.usage.output_tokens,
                        });
                    }
                }

                const finalMessage = await claudeStream.finalMessage();
                // console.log(
                //     "[claude-stream] final message",
                //     JSON.stringify(finalMessage),
                // );

                send({
                    type: "done",
                    sentMessage: message,
                    content: finalMessage.content,
                });
            } catch (error) {
                console.error("[claude-stream] error", error);
                send({
                    type: "error",
                    error:
                        error instanceof Error
                            ? error.message
                            : "Claude stream failed",
                });
            } finally {
                try {
                    controller.close();
                } catch {
                    // Already closed.
                }
            }
        },
        cancel() {
            claudeStream.abort();
        },
    });

    return new Response(body, {
        headers: {
            "Content-Type": "application/x-ndjson; charset=utf-8",
            "Cache-Control": "no-cache, no-transform",
        },
    });
}
