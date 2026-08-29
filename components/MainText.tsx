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
        <div className="main__text">
            <section className="inner-text px">
                <h1 className="fh1"> 
                    Website undergoing going an update 🚧
                </h1>
                
            </section>
        </div >
    )
}

export default MainText