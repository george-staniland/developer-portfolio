
"use client"
import { useEffect, useCallback, useState, useRef } from "react";

export default function HeroSection() {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const videoRef = useRef(null);
    const animationFrameRef = useRef(null);

    const [scrollPos, setScrollPos] = useState(0);
    const [gridSize, setGridSize] = useState(48);
    const gridSizeRef = useRef(gridSize);

    //pause during dev and design
    const pause = true;

    // Keep ref in sync with state for use in halftone
    useEffect(() => {
        gridSizeRef.current = gridSize;
    }, [gridSize]);

    // Update scroll position and gridSize on scroll
    const onScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = vh - 200;

        const startSize = 48;
        const endSize = 12;
        let size;

        if (scrollY <= 0) {
            size = startSize;
        } else if (scrollY >= maxScroll) {
            size = endSize;
        } else {
            const fraction = scrollY / maxScroll;
            const easedFraction = Math.pow(fraction, 0.5); // slow down the rate of change
            size = startSize - easedFraction * (startSize - endSize);
        }


        setScrollPos(scrollY);
        setGridSize(Math.round(size));
    }, []);


    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    // Halftone config (gridSize read via ref)
    const config = {
        brightness: 25,
        contrast: -10,
        gamma: 1.3,
        smoothing: 0,
        scaleFactor: 1,
        canvasBackgroundColor: '#fcfcfc',
        dotColor: '#e8e8e6',
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWrap = wrapRef.current;
        const video = videoRef.current;

        const setupCanvasDimensions = (width, height) => {
            const maxWidth = window.innerWidth;
            const maxHeight = window.innerHeight * 0.6;
            const ratio = Math.min(maxWidth / width, maxHeight / height);

            canvas.width = canvasWrap.clientWidth;
            canvas.height = (video.videoHeight / video.videoWidth) * canvas.width;

        };

        const generateHalftone = () => {
            const targetWidth = canvas.width * config.scaleFactor;
            const targetHeight = canvas.height * config.scaleFactor;
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = targetWidth;
            tempCanvas.height = targetHeight;
            const tempCtx = tempCanvas.getContext('2d');

            tempCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
            const imgData = tempCtx.getImageData(0, 0, targetWidth, targetHeight);
            const data = imgData.data;
            const grayData = new Float32Array(targetWidth * targetHeight);

            const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast));

            for (let i = 0; i < data.length; i += 4) {
                let gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                gray = contrastFactor * (gray - 128) + 128 + config.brightness;
                gray = Math.max(0, Math.min(255, gray));
                gray = 255 * Math.pow(gray / 255, 1 / config.gamma);
                grayData[i / 4] = gray;
            }

            const grid = gridSizeRef.current * config.scaleFactor;
            const numCols = Math.ceil(targetWidth / grid);
            const numRows = Math.ceil(targetHeight / grid);
            const cellValues = new Float32Array(numRows * numCols);

            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    let sum = 0, count = 0;
                    for (let y = row * grid; y < Math.min((row + 1) * grid, targetHeight); y++) {
                        for (let x = col * grid; x < Math.min((col + 1) * grid, targetWidth); x++) {
                            sum += grayData[y * targetWidth + x];
                            count++;
                        }
                    }
                    cellValues[row * numCols + col] = sum / count;
                }
            }

            const ctx = canvas.getContext('2d');

            ctx.fillStyle = config.canvasBackgroundColor;
            ctx.fillRect(0, 0, targetWidth, targetHeight);

            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    const brightnessValue = cellValues[row * numCols + col];
                    const norm = brightnessValue / 255;
                    const maxRadius = grid / 2;
                    const radius = maxRadius * (1 - norm);
                    if (radius > 0.5) {
                        ctx.beginPath();
                        ctx.arc(col * grid + grid / 2, row * grid + grid / 2, radius, 0, Math.PI * 2);
                        ctx.fillStyle = config.dotColor;
                        ctx.fill();
                    }
                }
            }
        };

        const processVideoFrame = () => {
            generateHalftone();
            animationFrameRef.current = requestAnimationFrame(processVideoFrame);
        };

        video.addEventListener('loadeddata', () => {
            setupCanvasDimensions(video.videoWidth, video.videoHeight);
            video.play();
            processVideoFrame();
            if (pause) {
                video.pause()
            }

        });

        video.src = '/dog-slow.mp4';
        video.crossOrigin = 'anonymous';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    return (
        <section className="hero__section px">
            <div className="animation-wrap" ref={wrapRef}>
                <canvas ref={canvasRef} />
                <video ref={videoRef} style={{ display: 'none' }} />
            </div>
        </section>
    );
}

