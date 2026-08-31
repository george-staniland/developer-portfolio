"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);

function MainText() {

     useGSAP(() => {
        gsap.to('.main__text .text-wrap',
            {
                opacity: 1,
                delay: 0.2,
                duration: 0.3,
                ease: "power2.in",
            }
        )
    })

    return (
        <div className="main__text px">
           <div className="text-wrap">
            <h1>
                <span>George Staniland</span>
                <span>Front-end Developer</span>
                <span className="h1-lighter">write some words here </span> 
                <span className="h1-lighter">that make more sense</span>
            </h1>
           </div>
        </div >
    )
}

export default MainText