"use client";

import { useEffect, useState } from "react";

type ContentBlock = {
    type: string;
    text?: string;
};

function formatContentBlock(block: ContentBlock, index: number) {
    if (block.type === "text" && block.text != null) {
        return <p key={index}>{block.text}</p>;
    }

    return (
        <pre key={index}>{JSON.stringify(block, null, 2)}</pre>
    );
}

export default function ClaudeApiExperiment() {
    const [sentMessage, setSentMessage] = useState<string | null>(null);
    const [content, setContent] = useState<ContentBlock[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        void fetch("/api/claude-test")
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    setError(
                        typeof data.error === "string"
                            ? data.error
                            : "Request failed",
                    );
                    return;
                }
                setSentMessage(data.sentMessage ?? null);
                setContent(Array.isArray(data.content) ? data.content : []);
            })
            .catch(() => {
                setError("Could not reach the Claude API route.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="experiement__claude-api">
            {loading && <p>Calling Claude…</p>}
            {error && <p role="alert">{error}</p>}

            {sentMessage != null && (
                <div className="sent-text">
                    <p>Message sent:</p>
                    <p>{sentMessage}</p>
                </div>
            )}

            {content.length > 0 && (
                <div className="response-text">
                    <p>Claude response</p>
                    {content.map(formatContentBlock)}
                </div>
            )}
        </section>
    );
}
