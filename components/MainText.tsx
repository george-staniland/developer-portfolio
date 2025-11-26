"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);

function MainText() {

     useGSAP(() => {
        gsap.to('.main__text .inner',
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: ".main__text .inner",
                    markers: false,
                    start: "top bottom-=60px",
                    toggleActions: "play reverse play reverse"
                },
            }
        )
    })

    return (
        <div className="main__text  ">
            <section className="inner  px">
                <h1 className="fh1"> 
                    Hi, I’m George Staniland — a creative front-end developer crafting robust, production-ready websites for designers and studios.
                </h1>
                
                <h3 className="fh3" >
                    I have five years of experience building websites and web applications.
                    Previously at <a href="https://www.superstarwebsites.co.nz/" target="_blank" rel="noopener noreferrer">Superstar Websites</a> and <a href="https://thewebguys.co.nz/" target="_blank" rel="noopener noreferrer">The Web Guys</a>, I currently contract for <a href="https://newterritory.studio/" target="_blank" rel="noopener noreferrer">New Territory Studio</a>. I am available for contract projects.
                </h3>

                <div className="tech">
                <h4 className="tech-title fh6">Technologies</h4>
                <h4 className="fh4 tech-items"> NextJs / React / Kirby CMS / Shopify / WordPress </h4>
                </div>
            </section>
        </div >
    )
}

export default MainText