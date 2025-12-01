"use client"
import { useState, useEffect,useRef } from 'react';
import HeroSection from '@/components/HeroSection';

export default function HeroSectionWrap() {
    const [isMobile, setIsMobile] = useState(null); // Start with null
    const animationFrameRef = useRef(null);


    useEffect(() => {
        setIsMobile(window.innerWidth < 860);
    }, []);


    useEffect(() => {
        if (!isMobile) return; // Only run on mobile

        const blob2 = document.getElementById('blob2');
        if (!blob2) return;

        let position = 5; // Starting position
        let direction = 1; // 1 for increasing, -1 for decreasing
        const minPos = 5;
        const maxPos = 30;
        const step = 0.11; // Smooth increment (adjust for speed)

        const animate = () => {
            position += step * direction;

            // Reverse direction at bounds
            if (position >= maxPos) {
                position = maxPos;
                direction = -1;
            } else if (position <= minPos) {
                position = minPos;
                direction = 1;
            }
            blob2.style.left = `${position}%`;
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isMobile]);

    // Don't render anything until we know if it's mobile
    if (isMobile === null) {
        return <div style={{ height: '95vh' }} />; // Placeholder to prevent layout shift
    }

    return (
        <>
            {!isMobile && <HeroSection />}

            {isMobile &&
            <section className='px hero__secton_mobile '>
                <div className="h-inner">
                    <div className='colour-holder'>
                        <div id="blob1"></div>
                        <div id="blob2"></div>
                        <div id="blob3"></div>
                        <div id="noiseLayer"></div>
                        <svg viewBox='0 0 500 500' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'>

                            <filter id='noiseFilter'>
                                <feTurbulence
                                    type='fractalNoise'
                                    baseFrequency='1'
                                    numOctaves='1'
                                    stitchTiles='stitch' />
                            </filter>
                        </svg>
                    </div>
                </div>
            </section>
}
        </>
    );
}