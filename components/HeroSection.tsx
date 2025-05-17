"use client"
import { useEffect, useCallback, useState, useRef } from "react";



function HeroSection() {
    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const animationFrameRef = useRef(null);

    const [scrollPos, setScrollPos] = useState(0)

    const onScroll = useCallback(event => {
        const { scrollY } = window;
        setScrollPos(scrollY)
        console.log("scrollY", scrollY);
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll, { passive: true });
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, [onScroll]);

    // Hardcoded effect parameters
    const config = {
        gridSize: 40,
        brightness: 70,
        contrast: 0,
        gamma: 1.0,
        smoothing: 0,
        ditherType: "None",
        scaleFactor: 1,
        videoSrc: "https://i.imgur.com/5PrJCc2.mp4"
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        const setupCanvasDimensions = (width, height) => {
            const maxWidth = window.innerWidth * 0.6;
            const maxHeight = window.innerHeight * 0.6;
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            canvas.width = width * ratio;
            canvas.height = height * ratio;
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

            const grid = config.gridSize * config.scaleFactor;
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
            ctx.fillStyle = 'white';
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
                        ctx.fillStyle = 'black';
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
        });

        // video.src = '/dog-4.mp4';
        video.crossOrigin = "anonymous";
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    return (
        <section className="hero__section">
            <div className="animation-wrap">
                <canvas ref={canvasRef} className="border border-gray-400" />
                <video ref={videoRef} style={{ display: 'none' }} />
            </div>
        </section>
    );
};

export default HeroSection;
