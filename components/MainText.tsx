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
                
                <p className="name text">George Staniland</p>
                <p className="title text">Software and Website Developer</p>

                <div className="body-wrap body-wrap--split">
                    <p className="body-text text">Solving problems, and working with teams </p>
                    <p className="body-text text">to turn designs into pixel-perfect interfaces.</p>
                </div>
                <div className="body-wrap body-wrap--combined">
                    <p className="body-text text">
                        Solving problems, and working with teams to turn designs into pixel-perfect interfaces.
                    </p>
                </div>

                <div className="circle-el"></div>
           </div>
        </div >
    )
}

export default MainText