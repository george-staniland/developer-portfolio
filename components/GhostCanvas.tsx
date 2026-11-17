"use client"
import { useEffect, useRef } from "react";

const COLOR = "#ffd400";
const SIZE_VW = 20;
const TRAIL_LIFETIME = 6000;
const TOUCH_DURATION = 2000;
const FOLLOW = 0.1;
const MIN_STEP = 2;

type TrailPoint = { x: number; y: number; t: number; gap: boolean };

const hexToRgb = (hex: string) => {
    const value = parseInt(hex.replace("#", ""), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
};

const [R, G, B] = hexToRgb(COLOR);

// The canvas is multiplied over the background, so white is invisible and
// strength 0..1 tints from white toward COLOR.
const tint = (strength: number) => {
    const s = Math.max(0, Math.min(1, strength));
    const mix = (c: number) => Math.round(255 - (255 - c) * s);
    return `rgb(${mix(R)}, ${mix(G)}, ${mix(B)})`;
};

export default function GhostCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const parent = canvas?.parentElement;
        if (!canvas || !parent) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let cssWidth = 0;
        let cssHeight = 0;
        let size = 0;
        let frame = 0;
        let lastTime = 0;
        let inView = false;
        let visible = false;
        let circleAlpha = 0;
        let gapNext = true;
        let touchTimer: ReturnType<typeof setTimeout> | undefined;

        const head = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const points: TrailPoint[] = [];

        const setupCanvasDimensions = () => {
            const dpr = window.devicePixelRatio || 1;
            cssWidth = parent.clientWidth;
            cssHeight = parent.clientHeight;
            size = window.innerWidth * (SIZE_VW / 100);

            canvas.width = Math.round(cssWidth * dpr);
            canvas.height = Math.round(cssHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        };

        const draw = (now: number) => {
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, cssWidth, cssHeight);
            ctx.globalCompositeOperation = "darken";
            ctx.lineWidth = size;

            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const strength = 1 - (now - point.t) / TRAIL_LIFETIME;
                const prev = points[i - 1];

                if (!prev || point.gap) {
                    ctx.fillStyle = tint(strength);
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    continue;
                }

                ctx.strokeStyle = tint(strength);
                ctx.beginPath();
                ctx.moveTo(prev.x, prev.y);
                ctx.lineTo(point.x, point.y);
                ctx.stroke();
            }

            if (circleAlpha > 0.01) {
                ctx.fillStyle = tint(circleAlpha);
                ctx.beginPath();
                ctx.arc(head.x, head.y, size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const tick = (now: number) => {
            const dt = lastTime ? Math.min((now - lastTime) / (1000 / 60), 4) : 1;
            lastTime = now;

            const follow = 1 - Math.pow(1 - FOLLOW, dt);
            head.x += (target.x - head.x) * follow;
            head.y += (target.y - head.y) * follow;

            const fade = 1 - Math.pow(1 - 0.12, dt);
            circleAlpha += ((visible ? 1 : 0) - circleAlpha) * fade;

            if (visible) {
                const last = points[points.length - 1];
                if (!last || gapNext || Math.hypot(head.x - last.x, head.y - last.y) > MIN_STEP) {
                    points.push({ x: head.x, y: head.y, t: now, gap: gapNext });
                    gapNext = false;
                }
            }

            while (points.length && now - points[0].t > TRAIL_LIFETIME) {
                points.shift();
            }

            draw(now);

            if (!visible && circleAlpha < 0.01 && !points.length) {
                stopLoop();
                return;
            }
            frame = requestAnimationFrame(tick);
        };

        const startLoop = () => {
            if (frame || !inView) return;
            lastTime = 0;
            frame = requestAnimationFrame(tick);
        };

        function stopLoop() {
            cancelAnimationFrame(frame);
            frame = 0;
            ctx?.clearRect(0, 0, cssWidth, cssHeight);
        }

        const toLocal = (e: PointerEvent) => {
            const rect = parent.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const snapTo = (x: number, y: number) => {
            head.x = target.x = x;
            head.y = target.y = y;
            gapNext = true;
        };

        const hideAfterTouch = () => {
            clearTimeout(touchTimer);
            touchTimer = setTimeout(() => {
                visible = false;
            }, TOUCH_DURATION);
        };

        const onPointerMove = (e: PointerEvent) => {
            const { x, y } = toLocal(e);
            if (!visible && circleAlpha < 0.05) snapTo(x, y);
            target.x = x;
            target.y = y;
            visible = true;
            if (e.pointerType === "touch") hideAfterTouch();
            startLoop();
        };

        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType !== "touch") return;
            const { x, y } = toLocal(e);
            snapTo(x, y);
            visible = true;
            hideAfterTouch();
            startLoop();
        };

        const onPointerLeave = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            visible = false;
        };

        setupCanvasDimensions();

        const resizeObserver = new ResizeObserver(setupCanvasDimensions);
        resizeObserver.observe(parent);

        const visibilityObserver = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            if (inView) {
                if (visible || points.length) startLoop();
            } else {
                stopLoop();
            }
        });
        visibilityObserver.observe(parent);

        parent.addEventListener("pointermove", onPointerMove);
        parent.addEventListener("pointerdown", onPointerDown);
        parent.addEventListener("pointerleave", onPointerLeave);

        return () => {
            parent.removeEventListener("pointermove", onPointerMove);
            parent.removeEventListener("pointerdown", onPointerDown);
            parent.removeEventListener("pointerleave", onPointerLeave);
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            clearTimeout(touchTimer);
            stopLoop();
        };
    }, []);

    return <canvas ref={canvasRef} className="ghost-canvas" aria-hidden="true" />;
}
