"use client";

import { useEffect, useRef, useState } from "react";
import {
    type ClientMirrorInfo,
    enrichClientMirrorInfo,
    getClientMirrorInfo,
} from "@/lib/clientMirrorInfo";
import { getClientIp } from "@/lib/clientIp";

type ContentBlock = {
    type: string;
    text?: string;
};

function formatMirrorClaudeMessage(
    info: ClientMirrorInfo,
    ip: string | null,
): string {
    const telemetry = [
        `Device type: ${info.deviceType}`,
        `Brand: ${info.brand}`,
        ip ? `Public IP: ${ip}` : null,
    ].filter((line): line is string => Boolean(line));

    return [
        "Use the client telemetry below to draw one complete SVG illustration.",
        "",
        ...telemetry,
    ].join("\n");
}

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
    const [mirrorSize, setMirrorSize] = useState<string | null>(null);
    const [clientInfo, setClientInfo] = useState<ClientMirrorInfo | null>(null);
    const [clientIp, setClientIp] = useState<string | null>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadMirrorAndCallClaude() {
            const browserInfo = getClientMirrorInfo();
            setClientInfo(browserInfo);

            const [enriched, ip] = await Promise.all([
                enrichClientMirrorInfo(browserInfo),
                getClientIp(),
            ]);

            if (cancelled) return;

            setClientInfo(enriched);
            setClientIp(ip);

            const message = formatMirrorClaudeMessage(enriched, ip);

            try {
                const res = await fetch("/api/claude-test", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                });
                const data = await res.json();
                if (cancelled) return;
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
            } catch {
                if (!cancelled) {
                    setError("Could not reach the Claude API route.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        void loadMirrorAndCallClaude();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        const el = mirrorRef.current;
        if (!el) return;

        const updateSize = () => {
            const { width, height } = el.getBoundingClientRect();
            setMirrorSize(`${Math.round(width)} x ${Math.round(height)}`);
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <section className="experiement__claude-api">
            {loading && <p className="expi-title fh3">Calling Claude…</p>}
            {error && <p role="alert">{error}</p>}

            {sentMessage != null && (
                <div className="sent-text">
                    <p>Message sent: is it thosss?</p>
                    <p>{sentMessage}</p>
                </div>
            )}

            {content.length > 0 && (
                <div className="response-text">
                    <p>Claude response</p>
                    {content.map(formatContentBlock)}
                </div>
            )}
            <div ref={mirrorRef} className="user-creepy-mirror">
                <div className="mirror-readout">
                    {mirrorSize != null && (
                        <p className="mirror-line">{mirrorSize}</p>
                    )}
                </div>
            </div>
            
        </section>
    );
}
