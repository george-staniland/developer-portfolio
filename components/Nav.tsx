"use client"
import { useState } from "react"
import { useSpring, animated, config } from '@react-spring/web'
import { overlay } from "three/examples/jsm/nodes/Nodes.js";

function Nav() {
    const [isActive, setIsActive] = useState(false);

    const btnStyle = useSpring({
        height: isActive ? '540px' : '26px',
        width: isActive ? '460px' : '37px',
    })

    // Spring for overlay content opacity
    const overlayStyle = useSpring({
        opacity: isActive ? 1 : 0,
        delay: isActive ? 990 : 0, // Delay opacity change until button has expanded
        config: config.stiff
    });

    return (
        <nav className="main-nav py" >
            <div className="inner px">
                <h2>George Staniland</h2>
                <animated.div
                    role="button"
                    className={`menu btn nav-btn ${isActive ? 'is-active' : 'non-active'}`}
                    onClick={() => setIsActive(!isActive)}
                    style={btnStyle}
                >
                    <div className="dots">
                        <span>•</span>
                        <span>•</span>
                        <span>•</span>
                    </div>
                    <animated.section style={overlayStyle} className="overlay-content">
                        <div className="overlay-inner">
                            <p>Hello ✋</p>
                            <div className="items">
                                <p>I'm currently in Auckland, New Zealand</p>
                                <p className="email" >email:
                                    <object className="email" width="292" height="27" data="/contact-e.svg" type="image/svg+xml"></object> </p>
                                <p className="phone" >whatsapp:  <object className="phone" width="171" height="20" data="/contact-p.svg" type="image/svg+xml"></object></p>
                            </div>
                        </div>
                    </animated.section>
                </animated.div>
            </div>
        </nav>
    )
}

export default Nav