"use client"
import { useState, useEffect,useRef } from 'react';
import HeroSection from '@/components/HeroSection';
import { isTablet } from 'react-device-detect';

export default function HeroSectionWrap() {
    const [isMobile, setIsMobile] = useState<boolean | null>( null); // Start with null

    useEffect(() => {
        setIsMobile(window.innerWidth < 860);
    }, []);


    // Don't render anything until we know if it's mobile
    if (isMobile === null) {
        return <div style={{ height: '95vh' }} />; // Placeholder to prevent layout shift
    }

    return (
        <>
            {!isMobile && !isTablet && <HeroSection />}
            {isMobile || isTablet &&
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
                                    baseFrequency='2'
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