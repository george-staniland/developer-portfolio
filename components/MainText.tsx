"use client"
import { useEffect, useRef, useState } from "react"
import { useSpring, animated, config } from '@react-spring/web'
import { div } from "three/examples/jsm/nodes/Nodes.js";


function MainText() {
    const sectionRef = useRef(null)
    const [atTop, setAtTop] = useState(false);

    const sectionStyle = useSpring({
        backgroundColor: atTop ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)',
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
                // console.log(atTop, rect.top)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [atTop]);

    return (
        <div className="main__text px">
            <animated.section ref={sectionRef} className="inner">
                <h2>Hi, I'm a front-end developer specialising in web technologies. <br></br> <span>I work with diverse technologies to solve complex problems <br></br> and create beautiful things. </span>
                </h2>
                <h3>Currently at New Territory Studio. Previously at The Web Guys and Superstar Websites</h3>
            </animated.section>
        </div >
    )
}

export default MainText