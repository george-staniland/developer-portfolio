// @ts-nocheck
"use client"
import { useEffect, useCallback, useState, useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);


export default function HeroSection() {
    const canvasRef = useRef(null);
    const wrapRef = useRef(null);
    const videoRef = useRef(null);
    const animationFrameRef = useRef(null);
    const [ isMobile, setIsMobile ] = useState(false)
    const [gridSize, setGridSize] = useState(70);
    const gridSizeRef = useRef(gridSize);

    //pause during dev and design
    const pause = false;

    useEffect(() => {
        if (window.innerWidth < 860) {
            setIsMobile(true)
            setGridSize(35)
        }
    }, [])


    useGSAP(() => {
        // if (window.innerWidth < 860) return; 
        gsap.to('.hero__section ',
            {
                x: 0,
                scrollTrigger: {
                    trigger: ".hero__section",
                    pin: true,
                    markers: false,
                    start: "10% 6%",
                    // anticipatePin: 1,
                    end: () => `+=${window.innerHeight - 100}`
                },
            }
        )
    })

    // Keep ref in sync with state for use in halftone
    useEffect(() => {
        gridSizeRef.current = gridSize;
    }, [gridSize]);

    // Update scroll position and gridSize on scroll
    const onScroll = useCallback(() => {
       
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = vh - 100;

        // const startSize = 70;
       const startSize = isMobile ? 35 : 70;
       const endSize = 10;
       let size;


        if (scrollY <= 0) {
            size = startSize;
        } else if (scrollY >= maxScroll) {
            size = endSize;
        } else {
            const fraction = scrollY / maxScroll;
            const easedFraction = Math.pow(fraction, 0.5);
            size = startSize - easedFraction * (startSize - endSize);
        }
        const roundedSize = Math.round(size);

         if (Math.abs(roundedSize - gridSizeRef.current) > 0.6) {
            setGridSize(roundedSize);
        }
    }, [isMobile]);


    useEffect(() => {
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    // Halftone config (gridSize read via ref)
    const config = {
        brightness: 20,
        contrast: 0,
        gamma: 1,
        scaleFactor: 1,
        canvasBackgroundColor: '#f0f0f0',
        dotColor: '#000000ff',
    };

    const tempCanvasRef = useRef(null);
    const tempCtxRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const canvasWrap = wrapRef.current;
        const video = videoRef.current;

          // Create temp canvas ONCE
    if (!tempCanvasRef.current) {
        tempCanvasRef.current = document.createElement('canvas');
        tempCtxRef.current = tempCanvasRef.current.getContext('2d', {
            willReadFrequently: true
        });
    }

       const setupCanvasDimensions = (videoWidth, videoHeight) => {
        const canvasWrapWidth = canvasWrap.clientWidth;
        canvas.width = canvasWrapWidth;
        canvas.height = (videoHeight / videoWidth) * canvas.width;
        
        // Also set temp canvas dimensions
        const targetWidth = canvas.width * config.scaleFactor;
        const targetHeight = canvas.height * config.scaleFactor;
        tempCanvasRef.current.width = targetWidth;
        tempCanvasRef.current.height = targetHeight;
    };


        const generateHalftone = () => {
              const targetWidth = tempCanvasRef.current.width;
        const targetHeight = tempCanvasRef.current.height;
        const tempCtx = tempCtxRef.current;

        tempCtx.drawImage(video, 0, 0, targetWidth, targetHeight);
        const imgData = tempCtx.getImageData(0, 0, targetWidth, targetHeight);

        
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = targetWidth;
            tempCanvas.height = targetHeight;

          

           
                   
            const data = imgData.data;
            const grayData = new Float32Array(targetWidth * targetHeight);

            const contrastFactor = (259 * (config.contrast + 255)) / (255 * (259 - config.contrast));

            // Pre-calculate constants
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

            const ctx = canvas.getContext('2d');
            ctx.fillStyle = config.canvasBackgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Pre-calculate for arc drawing
            const maxRadius = grid / 2;
            const gridHalf = grid / 2;

            ctx.fillStyle = config.dotColor;

            // Single pass - calculate and draw in one loop
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    let sum = 0, count = 0;
                    const rowStart = row * grid;
                    const rowEnd = Math.min((row + 1) * grid, targetHeight);
                    const colStart = col * grid;
                    const colEnd = Math.min((col + 1) * grid, targetWidth);

                    for (let y = rowStart; y < rowEnd; y++) {
                        for (let x = colStart; x < colEnd; x++) {
                            sum += grayData[y * targetWidth + x];
                            count++;
                        }
                    }

                    const brightnessValue = sum / count;
                    const norm = brightnessValue / 255;
                    const radius = maxRadius * (1 - norm);

                    const circlePath = new Path2D();

                    if (radius > 0.5) {
            circlePath.arc(
                col * grid + gridHalf,
                row * grid + gridHalf,
                radius,
                0,
                Math.PI * 2
            );
            ctx.fill(circlePath);
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

        video.src = '/smol.mp4';
        video.crossOrigin = 'anonymous';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, []);

    return (
        <section className="hero__section  px  ">
            <div className="animation-wrap  " ref={wrapRef}>

                <canvas ref={canvasRef} className="" />
                <video ref={videoRef} style={{ display: 'none' }} />

                <div className="colour-overlay">
                </div>
            </div>
        </section>
    );
}

