"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const START_GRID = 90;
const END_GRID = 20;

const config = {
    brightness: 20,
    contrast: 0,
    gamma: 1,
    scaleFactor: 1,
    canvasBackgroundColor: "#f0f0f0",
    dotColor: "#000000ff",
};

export default function ExperimentHalftoneCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const animationFrameRef = useRef<number>(0);
    const gridSizeRef = useRef(START_GRID);
    const tempCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const tempCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        // ScrollTrigger.create({
        //     trigger: section,
        //     pin: true,
        //     markers: false,
        //     start: "12% 6%",
        //     anticipatePin: 1,
        //     end: () => `+=${window.innerHeight - 100}`,
        //     onUpdate: (self) => {
        //         const eased = Math.pow(self.progress, 0.5);
        //         const size = START_GRID - eased * (START_GRID - END_GRID);
        //         const rounded = Math.round(size);
        //         if (Math.abs(rounded - gridSizeRef.current) > 0.6) {
        //             gridSizeRef.current = rounded;
        //         }
        //     },
        // });
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWrap = wrapRef.current;
        const video = videoRef.current;
        if (!canvas || !canvasWrap || !video) return;

        if (!tempCanvasRef.current) {
            tempCanvasRef.current = document.createElement("canvas");
            tempCtxRef.current = tempCanvasRef.current.getContext("2d", {
                willReadFrequently: true,
            });
        }

        const setupCanvasDimensions = (videoWidth: number, videoHeight: number) => {
            const tempCanvas = tempCanvasRef.current;
            if (!tempCanvas || !videoWidth || !videoHeight) return;

            const canvasWrapWidth = canvasWrap.clientWidth;
            const videoAspectRatio = videoWidth / videoHeight;

            canvas.width = canvasWrapWidth;
            canvas.height = canvasWrapWidth / videoAspectRatio;

            tempCanvas.width = canvas.width * config.scaleFactor;
            tempCanvas.height = canvas.height * config.scaleFactor;
        };

        const generateHalftone = () => {
            const tempCanvas = tempCanvasRef.current;
            const tempCtx = tempCtxRef.current;
            if (!tempCanvas || !tempCtx || video.readyState < 2) return;

            const targetWidth = tempCanvas.width;
            const targetHeight = tempCanvas.height;
            if (!targetWidth || !targetHeight) return;

            tempCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
            const imgData = tempCtx.getImageData(0, 0, targetWidth, targetHeight);
            const data = imgData.data;
            const grayData = new Float32Array(targetWidth * targetHeight);

            const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast));
            const gammaInverse = 1 / config.gamma;

            for (let i = 0; i < data.length; i += 4) {
                let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                gray = contrastFactor * (gray - 128) + 128 + config.brightness;
                gray = Math.max(0, Math.min(255, gray));
                gray = 255 * Math.pow(gray / 255, gammaInverse);
                grayData[i / 4] = gray;
            }

            const grid = gridSizeRef.current * config.scaleFactor;
            const numCols = Math.ceil(targetWidth / grid);
            const numRows = Math.ceil(targetHeight / grid);

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            ctx.fillStyle = config.canvasBackgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const maxRadius = grid / 2;
            const gridHalf = grid / 2;
            ctx.fillStyle = config.dotColor;

            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    let sum = 0;
                    let count = 0;
                    const rowStart = Math.floor(row * grid);
                    const rowEnd = Math.min(Math.floor((row + 1) * grid), targetHeight);
                    const colStart = Math.floor(col * grid);
                    const colEnd = Math.min(Math.floor((col + 1) * grid), targetWidth);

                    for (let y = rowStart; y < rowEnd; y++) {
                        const yIndex = y * targetWidth;
                        for (let x = colStart; x < colEnd; x++) {
                            sum += grayData[yIndex + x];
                            count++;
                        }
                    }

                    if (!count) continue;

                    const radius = maxRadius * (1 - sum / count / 255);
                    if (radius > 0.5) {
                        ctx.beginPath();
                        ctx.arc(
                            col * grid + gridHalf,
                            row * grid + gridHalf,
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

        const onLoaded = () => {
            setupCanvasDimensions(video.videoWidth, video.videoHeight);
            video.play().catch(() => {});
            cancelAnimationFrame(animationFrameRef.current);
            processVideoFrame();
        };

        video.addEventListener("loadeddata", onLoaded);
        video.crossOrigin = "anonymous";
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.src = "/running-man_compressed.mp4";

        return () => {
            video.removeEventListener("loadeddata", onLoaded);
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <section className="experiment__halftone" ref={sectionRef}>
            <div className="animation-wrap" ref={wrapRef}>
                <canvas ref={canvasRef} />
                <video ref={videoRef} muted playsInline loop />
            </div>
        </section>
    );
}
