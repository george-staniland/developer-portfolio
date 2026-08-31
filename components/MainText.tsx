"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);

function MainText() {

     useGSAP(() => {
        gsap.to('.main__text .inner-text',
            {
                opacity: 1,
                duration: 0.33,
                ease: "power2.out",
            }
        )
    })

    return (
        <div className="main__text px">
           <div className="text-wrap">
            tttt
           </div>
        </div >
    )
}

export default MainText