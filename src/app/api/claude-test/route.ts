import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

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

    const response = await client.messages.create({
        max_tokens: 10000,
        messages: [{ content: message, role: "user" }],
        system: [
            {
                type: "text",
                text: SYSTEM_PROMPT,
                cache_control: { type: "ephemeral" },
            },
        ],
        model: "claude-opus-5-5",
    });

    return NextResponse.json({
        sentMessage: message,
        content: response.content,
    });
}
