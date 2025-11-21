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
        <div className="main__text px outline ">
            <section className="inner  outline px">
                <h1> 
                    Hi. I’m George Staniland, a creative front-end web developer.  I bring designs and wireframes to life with precision and technical expertise.
                </h1>
                <h3>I have five years experience coding websites and web applications. Previously at <a href="https://www.superstarwebsites.co.nz/" target="_blank">Superstar Websites</a> and  <a href="https://thewebguys.co.nz/" target="_blank">The Web Guys</a>, I currently contract for <a  target="_blank" href="https://newterritory.studio/"> New Territory</a> studio. I am currently <i> available </i> for contract projects. </h3>
                <div className="tech">
                <h4 className="tech-title">Technologies</h4>
                <h4> NextJs / React / Kirby CMS / Shopify / WordPress </h4>
                </div>
            </section>
        </div >
    )
}

export default MainText