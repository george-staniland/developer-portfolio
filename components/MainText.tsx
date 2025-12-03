"use client"
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP); 
gsap.registerPlugin(ScrollTrigger);

function MainText() {

     useGSAP(() => {
        if (window.innerWidth > 860) return; 
        gsap.from('.main__text .inner-text',
            {
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: ".main__text",
                    markers: false,
                    start: "0 bottom-=120px",
                },
            }
        )
    })

    return (
        <div className="main__text">
            <section className="inner-text px">
                <h1 className="fh1"> 
                    Hi, I’m George Staniland  <span className="mob-l-break">— </span> a creative front-end developer crafting robust, production-ready websites for designers and studios.
                </h1>
                
                <h3 className="fh3" >
                    I have 5 years of experience building websites and web applications.
                    Previously at <a href="https://www.superstarwebsites.co.nz/" target="_blank" rel="noopener noreferrer">Superstar Websites</a> and <a href="https://thewebguys.co.nz/" target="_blank" rel="noopener noreferrer">The Web Guys</a>, and most recently at <a href="https://newterritory.studio/" target="_blank" rel="noopener noreferrer">New Territory Studio</a>,  I am currently <span className="yes-icon"> available </span> for contract projects.
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