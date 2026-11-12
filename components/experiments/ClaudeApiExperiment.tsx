"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    type ClientMirrorInfo,
    enrichClientDeviceSpecs,
    getClientDeviceSpecs,
} from "@/lib/clientMirrorInfo";
import { type ClientIpInfo, getClientIp } from "@/lib/clientIp";

// Dev/testing only: set to true to keep the loading state showing permanently.
const FORCE_LOADING = false;

type ContentBlock = {
    type: string;
    text?: string;
};

function formatMirrorClaudeMessage(
    info: ClientMirrorInfo,
    ipInfo: ClientIpInfo | null,
): string {

    const telemetry = [
        `Device type is: ${info.deviceType}.`,
        `Brand: ${info.brand}.`,
        ipInfo?.city ? `City: ${ipInfo.city}.` : null,
        ipInfo?.country ? `Country: ${ipInfo.country}.` : null,
    ].filter((line): line is string => Boolean(line));

    return [
        "Use the client telemetry below to draw one complete SVG illustration.",
        "",
        ...telemetry,
    ].join("\n");
}

function getResponseText(blocks: ContentBlock[]): string {
    return blocks
        .filter((block) => block.type === "text" && block.text != null)
        .map((block) => block.text as string)
        .join("");
}

function extractNotes(blocks: ContentBlock[]): string | null {
    const match = getResponseText(blocks).match(/<notes>([\s\S]*?)<\/notes>/i);
    const notes = match?.[1].trim();

    return notes ? notes : null;
}

function extractSvgMarkup(blocks: ContentBlock[]): string | null {
    const text = getResponseText(blocks);

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
    const [notes, setNotes] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const isLoading = FORCE_LOADING || loading;
    const [mirrorSize, setMirrorSize] = useState<string | null>(null);
    const [clientInfo, setClientInfo] = useState<ClientMirrorInfo | null>(null);
    const mirrorRef = useRef<HTMLDivElement>(null);
    const svgWrapRef = useRef<HTMLDivElement>(null);
    const [dotCount, setDotCount] = useState(0);

    // While loading, cycle the dots 0 -> 4, then back to 0, and repeat.
    useEffect(() => {
        if (!isLoading) return;

        setDotCount(0);
        const interval = window.setInterval(() => {
            setDotCount((count) => (count >= 4 ? 0 : count + 1));
        }, 500);

        return () => window.clearInterval(interval);
    }, [isLoading]);

    // "Draw on" each SVG shape: dash the stroke to its full length, then
    // animate the dash offset to 0. All shapes animate at the same time.
    useLayoutEffect(() => {
        const wrap = svgWrapRef.current;
        if (!wrap || svgMarkup == null) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const shapes = wrap.querySelectorAll<SVGGeometryElement>(
            "path, circle, ellipse, rect, line",
        );

        const animations = Array.from(shapes).map((el, i) => {
            const length = el.getTotalLength();
            el.style.strokeDasharray = `${length}`;

            return el.animate(
                [{ strokeDashoffset: length }, { strokeDashoffset: 0 }],
                {
                    duration: 1800,
                    delay: i * 40,
                    easing: "ease-in-out",
                    fill: "both",
                },
            );
        });

        return () => animations.forEach((animation) => animation.cancel());
    }, [svgMarkup]);


    useEffect(() => {
        let cancelled = false;

        async function loadMirrorAndCallClaude() {
            const clientDevSpecs = getClientDeviceSpecs();

            setClientInfo(clientDevSpecs);

            const [enriched, ipInfo] = await Promise.all([
                enrichClientDeviceSpecs(clientDevSpecs),
                getClientIp(),
            ]);

            if (cancelled) return;

            setClientInfo(enriched);
            const message = formatMirrorClaudeMessage(enriched, ipInfo);

            try {
                const res = await fetch("/api/claude-test", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                });
                const data = await res.json();
                console.log('claude res??', data)
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
                setNotes(extractNotes(blocks));
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

            <div className="sent-text_or_loading">

                {isLoading && (
                    <>
                        <p className="loading-api-call fh3">
                            Asking Claude to draw an SVG{" "}
                            <span className="dotz">{"*".repeat(dotCount)}</span>
                        </p>
                        <p className="fb loading__body">
                            This is, creepily, based on your browser type, device, and rough location of your I.P address by sending it to a free API.
                        </p>
                    </>
                )}

                {sentMessage != null && (
                    <>
                        <p className="fh3 sent-msg-title">Message sent to the Claude API:</p>
                        <p>"{sentMessage}"</p>
                    </>
                )}

            </div>




            <div ref={mirrorRef} className="user-creepy-mirror">
                

                    {mirrorSize != null && (
                        <p className="mirror-size-readout">{mirrorSize}</p>
                    )}

                    {notes != null && <p className="test fh3">Claude Response:</p>}

                    {notes != null && <p className="claude-notes fb">"{notes}"</p>}

                    {svgMarkup != null && (
                        <div
                            ref={svgWrapRef}
                            dangerouslySetInnerHTML={{ __html: svgMarkup }}
                            className="claude-img-return__wrap"
                        />
                    )}
                
            </div>

        </section>
    );
}
