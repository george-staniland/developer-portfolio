"use client";

import { useEffect, useRef, useState } from "react";
import {
    type ClientMirrorInfo,
    enrichClientMirrorInfo,
    formatMirrorGuess,
    getClientMirrorInfo,
} from "@/lib/clientMirrorInfo";
import { type ClientIpInfo, getClientIp } from "@/lib/clientIp";

type ContentBlock = {
    type: string;
    text?: string;
};

function formatMirrorClaudeMessage(
    info: ClientMirrorInfo,
    ipInfo: ClientIpInfo | null,
): string {
    const telemetry = [
        `Device type: ${info.deviceType}`,
        `Brand: ${info.brand}`,
        ipInfo?.city ? `City: ${ipInfo.city}` : null,
        ipInfo?.country ? `Country: ${ipInfo.country}` : null,
    ].filter((line): line is string => Boolean(line));

    return [
        "Use the client telemetry below to draw one complete SVG illustration.",
        "",
        ...telemetry,
    ].join("\n");
}

function extractSvgMarkup(blocks: ContentBlock[]): string | null {
    const text = blocks
        .filter((block) => block.type === "text" && block.text != null)
        .map((block) => block.text as string)
        .join("");

    if (!text) return null;

    const match = text.match(/<svg[\s\S]*?<\/svg>/i);
    if (!match) return null;

    const doc = new DOMParser().parseFromString(match[0], "image/svg+xml");
    const parseError = doc.querySelector("parsererror");
    const svg = doc.documentElement;
    if (parseError || svg.tagName.toLowerCase() !== "svg") {
        return null;
    }

    return svg.outerHTML;
}

export default function ClaudeApiExperiment() {
    const [sentMessage, setSentMessage] = useState<string | null>(null);
    const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [mirrorSize, setMirrorSize] = useState<string | null>(null);
    const [clientInfo, setClientInfo] = useState<ClientMirrorInfo | null>(null);
    const [clientIpInfo, setClientIpInfo] = useState<ClientIpInfo | null>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
 


    useEffect(() => {
        let cancelled = false;

        async function loadMirrorAndCallClaude() {
            const browserInfo = getClientMirrorInfo();
            setClientInfo(browserInfo);

            const [enriched, ipInfo] = await Promise.all([
                enrichClientMirrorInfo(browserInfo),
                getClientIp(),
            ]);

            if (cancelled) return;

            setClientInfo(enriched);
            setClientIpInfo(ipInfo);

            const message = formatMirrorClaudeMessage(enriched, ipInfo);

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
                const blocks = Array.isArray(data.content)
                    ? (data.content as ContentBlock[])
                    : [];
                setSvgMarkup(extractSvgMarkup(blocks));
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
            {error && <p role="alert">{error}</p>}

            {sentMessage != null && (
                <div className="sent-text">
                    <p>Message sent to Claude API:</p>
                    <p>{sentMessage}</p>
                </div>
            )}


            <div ref={mirrorRef} className="user-creepy-mirror">
                <div className="mirror-readout">

                    {mirrorSize != null && (
                        <p className="mirror-size-readout">{mirrorSize}</p>
                    )}

{loading && 
                        <p className="loading-api-call fh3">Ask Claude to draw an image...</p>
                    }

                    {clientInfo != null && (
                        <p className="mirror-guess">
                            {formatMirrorGuess(clientInfo, clientIpInfo)}
                        </p>
                    )}

                    {svgMarkup != null && (
                        <div
                            dangerouslySetInnerHTML={{ __html: svgMarkup }}
                        />
                    )}
                </div>
            </div>
            
        </section>
    );
}
