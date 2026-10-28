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
                delay: 0.7,
                duration: 0.32,
                ease: "power1.in",
            }
        )
    })

    return (
        <div className="main__text px">
           <div className="text-wrap outline">
                
                <p className="title">George Staniland</p>
                <p className="sub-title">Software and Website Developer</p>

                <div className="body-wrap body-wrap--split">
                    <p className="body-copy">Solving problems, and working with teams </p>
                    <p className="body-copy">to turn designs into pixel-perfect interfaces.</p>
                </div>
                <div className="body-wrap body-wrap--combined">
                    <p className="body-copy">
                        Solving problems, and working with teams to turn designs into pixel{'\u2011'}perfect interfaces
                    </p>
                </div>

                <div className="circle-el"></div>
           </div>
        </div >
    )
}

export default MainText