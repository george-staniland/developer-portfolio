import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const USER_MESSAGE = "what is the temp in sydney today bra?";

export async function GET() {
    const apiKey = process.env.CLAUDE_API_TOKEN;
    if (!apiKey) {
        return NextResponse.json(
            { error: "CLAUDE_API_TOKEN is not configured" },
            { status: 500 },
        );
    }

    const client = new Anthropic({ apiKey });

    const message = await client.messages.create({
        max_tokens: 1024,
        messages: [{ content: USER_MESSAGE, role: "user" }],
        model: "claude-haiku-5-5",
    });

    return NextResponse.json({
        sentMessage: USER_MESSAGE,
        content: message.content,
    });
}
