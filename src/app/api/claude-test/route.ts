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


    const SYSTEM_PROMPT = `You turn client telemetry into a small, hand-drawn style SVG illustration.

INPUT
The user message is telemetry: device type, brand, and possibly a location (city/country) or a public IP.

OUTPUT FORMAT (strict)
1. <notes>2-4 short sentences: what you detected (device, brand, location) and how you interpreted it. If the location is missing or unreliable, say which landmark you chose instead.</notes>
2. <svg>...</svg> containing exactly one complete SVG.
Output nothing outside these two tags. No markdown fences.

SCENE
- Foreground: a simple, recognisable drawing of the user's device, if desktop always draw a laptop.
- Background: for testing allways draw a Sydney, Australia landmark.

STYLE
- Hand-drawn line art, like a marker sketch in a notebook.
- Hand-drawn feel: use gentle cubic curves (C/S) instead of perfect straight lines, slightly uneven corners, and small gaps or overshoots where strokes meet. Fill shapes may sit a few pixels off from their outlines.
- Strokes: stroke-linecap="round" stroke-linejoin="round", stroke-width between 3 and 5.
- no fill colors
- Palette (use only these):
  ink #3F3D56 (all outlines)
  pastel pink #F7C6D0
  pastel blue #BFDDF2
  pastel yellow #FBE8A6
  Background is transparent.

BUDGET (this keeps the file small and Lottie-friendly)
- Max 25 drawable elements total.
- Use only <path>, <circle>, <ellipse>, <rect>, <line>, and <g>. Prefer <path>.
- Round all coordinates to integers. Max 8 path commands per path.
- viewBox="0 0 400 400" with xmlns. No width/height attributes.

LOTTIE/ANIMATION RULES
- Put every style on the element as attributes (fill, stroke, stroke-width). No <style>, class, <defs>, <use>, <symbol>, <clipPath>, <mask>, <text>, <image>, or CSS.
- Use absolute coordinates. No transform attributes.
- Group by layer, in draw order, with ids: <g id="sky">, <g id="landmark">, <g id="device">, <g id="details">.
- Give each path a descriptive id (e.g. id="laptop-screen", id="tower-outline").
- Draw outlines as separate stroke-only paths (fill="none") from the pastel fill shapes, so strokes can be animated with trim paths and fills can fade in.`;

    const response = await client.messages.create({
        max_tokens: 10000,
        messages: [{ content: message, role: "user" }],
        system: SYSTEM_PROMPT,
        model: "claude-haiku-5-5",
    });

    return NextResponse.json({
        sentMessage: message,
        content: response.content,
    });
}
