"use client"
import { useEffect, useRef, useState } from "react"
import { useSpring, animated, config } from '@react-spring/web'
import { div } from "three/examples/jsm/nodes/Nodes.js";

function MainText() {
    const sectionRef = useRef(null)
    const [atTop, setAtTop] = useState(false);

    const sectionStyle = useSpring({
        backgroundColor: atTop ? 'rgb(172, 168, 168);' : 'rgba(172, 168, 168, 0.64)',
        borderRadius: atTop ? '6px' : '40px',
    })

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                // Detect if the top of the section touches the top of the viewport (allow a small offset)
                if (rect.top <= 300) {
                    setAtTop(true)
                } else {
                    setAtTop(false)
                }
                console.log(atTop, rect.top)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [atTop]);

    return (
        <animated.section ref={sectionRef} className="main__text" style={sectionStyle}>
            <h2>Hi, I'm George. I am a front end web developer. Currently at <a href="https:newterritory.studio/" rel="noopener" target="_blank">New Territory</a> , previously at  <a href="thewebguys.co.nz" rel="noopener" target="_blank">The Web Guys</a>, previously previously at <a href="https://www.superstarwebsites.co.nz/" rel="noopener" target="_blank" >Superstar</a> .  </h2>
        </animated.section>
    )
}

export default MainText