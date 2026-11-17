"use client"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const START_GRID = 140;
const END_GRID = 20;

const config = {
    brightness: 20,
    contrast: 0,
    gamma: 1,
    scaleFactor: 1,
    canvasBackgroundColor: "#f0f0f0",
    dotColor: "#000000ff",
};

const buildToneMap = () => {
    const toneMap = new Uint8Array(256);
    const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast));
    const gammaInverse = 1 / config.gamma;
    for (let i = 0; i < 256; i++) {
        let gray = contrastFactor * (i - 128) + 128 + config.brightness;
        gray = Math.max(0, Math.min(255, gray));
        toneMap[i] = Math.round(255 * Math.pow(gray / 255, gammaInverse));
    }
    return toneMap;
};

const DESKTOP_QUERY = "(min-width: 996px)";

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(DESKTOP_QUERY);
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    return isDesktop;
};

export default function ExperimentHalftoneCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>(0);
    const gridSizeRef = useRef(START_GRID);
    const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const tempCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    const isDesktop = useIsDesktop();

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section || !isDesktop) return;

        ScrollTrigger.create({
            trigger: section,
            pin: true,
            markers: false,
            start: "19% 10%",
            anticipatePin: 1,
            end: () => `+=${window.innerHeight - 350}`,
            onUpdate: (self) => {
                const eased = Math.pow(self.progress, 0.5);
                const size = START_GRID - eased * (START_GRID - END_GRID);
                const rounded = Math.round(size);
                if (Math.abs(rounded - gridSizeRef.current) > 0.6) {
                    gridSizeRef.current = rounded;
                }
            },
        });
    }, { dependencies: [isDesktop], revertOnUpdate: true });

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWrap = wrapRef.current;
        const video = videoRef.current;
        if (!canvas || !canvasWrap || !video || !isDesktop) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!tempCanvasRef.current) {
            tempCanvasRef.current = document.createElement("canvas");
            tempCtxRef.current = tempCanvasRef.current.getContext("2d", {
                willReadFrequently: true,
            });
        }

        const toneMap = buildToneMap();
        let grayData = new Uint8Array(0);
        let cssWidth = 0;
        let cssHeight = 0;
        let isReady = false;
        let isVisible = false;

        const setupCanvasDimensions = () => {
            const tempCanvas = tempCanvasRef.current;
            const { videoWidth, videoHeight } = video;
            if (!tempCanvas || !videoWidth || !videoHeight) return;

            const dpr = window.devicePixelRatio || 1;
            cssWidth = canvasWrap.clientWidth;
            cssHeight = cssWidth / (videoWidth / videoHeight);

            canvas.width = Math.round(cssWidth * dpr);
            canvas.height = Math.round(cssHeight * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            tempCanvas.width = Math.max(1, Math.round(cssWidth * config.scaleFactor));
            tempCanvas.height = Math.max(1, Math.round(cssHeight * config.scaleFactor));
            grayData = new Uint8Array(tempCanvas.width * tempCanvas.height);
        };

        const generateHalftone = () => {
            const tempCanvas = tempCanvasRef.current;
            const tempCtx = tempCtxRef.current;
            if (!tempCanvas || !tempCtx || video.readyState < 2) return;

            const targetWidth = tempCanvas.width;
            const targetHeight = tempCanvas.height;
            if (!targetWidth || !targetHeight || grayData.length !== targetWidth * targetHeight) return;

            tempCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
            const data = tempCtx.getImageData(0, 0, targetWidth, targetHeight).data;

            for (let i = 0, p = 0; p < grayData.length; i += 4, p++) {
                grayData[p] = toneMap[(77 * data[i] + 150 * data[i + 1] + 29 * data[i + 2]) >> 8];
            }

            const drawGrid = gridSizeRef.current;
            const sampleGrid = drawGrid * config.scaleFactor;
            const numCols = Math.ceil(targetWidth / sampleGrid);
            const numRows = Math.ceil(targetHeight / sampleGrid);

            ctx.fillStyle = config.canvasBackgroundColor;
            ctx.fillRect(0, 0, cssWidth, cssHeight);

            const gridHalf = drawGrid / 2;
            ctx.fillStyle = config.dotColor;

            for (let row = 0; row < numRows; row++) {
                const rowStart = Math.floor(row * sampleGrid);
                const rowEnd = Math.min(Math.floor((row + 1) * sampleGrid), targetHeight);

                for (let col = 0; col < numCols; col++) {
                    const colStart = Math.floor(col * sampleGrid);
                    const colEnd = Math.min(Math.floor((col + 1) * sampleGrid), targetWidth);
                    let sum = 0;

                    for (let y = rowStart; y < rowEnd; y++) {
                        const yIndex = y * targetWidth;
                        for (let x = colStart; x < colEnd; x++) {
                            sum += grayData[yIndex + x];
                        }
                    }

                    const count = (rowEnd - rowStart) * (colEnd - colStart);
                    if (count <= 0) continue;

                    const radius = gridHalf * (1 - sum / count / 255);
                    if (radius > 0.5) {
                        ctx.beginPath();
                        ctx.arc(
                            col * drawGrid + gridHalf,
                            row * drawGrid + gridHalf,
                            radius,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }
                }
            }
        };

        const processVideoFrame = () => {
            generateHalftone();
            animationFrameRef.current = requestAnimationFrame(processVideoFrame);
        };

        const startLoop = () => {
            if (!isReady || !isVisible || animationFrameRef.current) return;
            video.play().catch(() => {});
            animationFrameRef.current = requestAnimationFrame(processVideoFrame);
        };

        const stopLoop = () => {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = 0;
            video.pause();
        };

        const onLoaded = () => {
            isReady = true;
            setupCanvasDimensions();
            startLoop();
        };

        const visibilityObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) startLoop();
            else stopLoop();
        });
        visibilityObserver.observe(canvasWrap);

        const resizeObserver = new ResizeObserver(() => {
            if (isReady) setupCanvasDimensions();
        });
        resizeObserver.observe(canvasWrap);

        video.addEventListener("loadeddata", onLoaded);
        video.crossOrigin = "anonymous";
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.src = "/running-man_compressed.mp4";

        return () => {
            video.removeEventListener("loadeddata", onLoaded);
            visibilityObserver.disconnect();
            resizeObserver.disconnect();
            stopLoop();
            video.removeAttribute("src");
            video.load();
        };
    }, [isDesktop]);

    return (
        <section className="experiment__halftone" >
            <p className="mobile-notice fh6">Experiment not available on mobile</p>
            <div className="outer-wrap" ref={sectionRef}>
                <div className="animation-wrap" ref={wrapRef}>
                    <canvas ref={canvasRef} />
                    <video ref={videoRef} muted playsInline loop />
                </div>
            </div>
            <div className="spacer">
                <p>Hello World</p>
            </div>
        </section>
    );
}
