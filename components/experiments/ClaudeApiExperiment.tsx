"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Cs from "@/components/Cs";
import {
    type ClientMirrorInfo,
    enrichClientDeviceSpecs,
    getClientDeviceSpecs,
} from "@/lib/clientMirrorInfo";
import { type ClientIpInfo, getClientIp } from "@/lib/clientIp";

// Dev/testing only
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
    // When FORCE_LOADING is on, hide all returned data so only the loading
    // state shows, even if the response has already arrived.
    
    const shownSentMessage = FORCE_LOADING ? null : sentMessage;
    const shownNotes = FORCE_LOADING ? null : notes;
    const shownSvgMarkup = FORCE_LOADING ? null : svgMarkup;
    const [clientInfo, setClientInfo] = useState<ClientMirrorInfo | null>(null);
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

    return (
        <section className="experiement__claude-api">
            {error && (
                <p role="alert" className="claude-error fb">
                    {error}
                </p>
            )}

            <div className="inner-container">

            <div className="sent-text_or_loading">
                {isLoading && (
                    <>
                        <div className="claude-heading-row">
                        <span className="claude-tag">claude-haiku-5-5</span>
                            <p className="loading-api-call fh5">
                                Asking Claude to draw an SVG{" "}
                                <span className="dotz">{"*".repeat(dotCount)}</span>
                            </p>

                        </div>
                        <p className="fb loading__body">
                            This is, creepily, based on your device type, device brand, and location of your I.P address by sending it to a free API.
                        </p>
                    </>
                )}

                {shownSentMessage != null && (
                    <div className="msg-sent-text-wrap">
                        <p className="fh5 sent-msg-title">Message sent to the Claude API</p>
                        <p className="sent-msg-text">"{shownSentMessage}"</p>
                    </div>
                )}
            </div>

            <div className="user-creepy-mirror">
                {shownNotes != null && (
                    <div className="claude-notes-block">
                        <span className="claude-tag">Claude response</span>
                        <p className="claude-response-text">"{shownNotes}"</p>
                    </div>
                )}

                <div className="claude-img-return">
                    {/* Grey square: shows the spinner, then the SVG fades in */}
                    <div className="claude-img-return__frame">
                        {/* Stays mounted so it can fade out once the SVG arrives */}
                        <span
                            role="status"
                            aria-label="Loading"
                            className={`loading-spinner${
                                isLoading && shownSvgMarkup == null
                                    ? ""
                                    : " loading-spinner--hidden"
                            }`}
                        />

                        {shownSvgMarkup != null && (
                            <div
                                ref={svgWrapRef}
                                dangerouslySetInnerHTML={{ __html: shownSvgMarkup }}
                                className="claude-img-return__wrap"
                            />
                        )}
                    </div>
                </div>
            </div>

            {shownSvgMarkup != null && (
                <div className="experiment-notes fb">
                    <h2 className="fh5">Notes on using the Claude platform API</h2>
                    <p>The basic idea of this experiment is to use the Claude API as an advanced SVG generator and pass it dynamic data that is available from the browser.</p>

                    <div className="ul-wrap">
                    <p><b>Steps</b></p>
                        <ul>
                            <li>Use <Cs>navigator.userAgent</Cs> to find out the browser and type of device. Try the less supported <Cs>userAgentData</Cs> if available</li>
                            <li>Call the <Cs>Free IP API</Cs> and filter out City and Country from the response</li>
                            <li>Location is sometimes wrong. It will always be off if a user has a VPN</li>
                            <li>Call the Claude platform API with a system message and user message with browser and location information. I used the <Cs>claude-sonnet-5-5</Cs> model as it's a good mix of response quality and lower cost per token than more advanced Anthropic models.
                            <ul>
                                <li>Cache the system prompt for efficiency.</li>
                                <li>Set <Cs>max_tokens</Cs> to 6000. This limit is invisible to the model, but it sets a ceiling for cost and latency.</li>
                            </ul>
                            </li>
                        </ul>
                    </div>
                   
                </div> 
            )}

            </div>
            

        </section>
    );
}
