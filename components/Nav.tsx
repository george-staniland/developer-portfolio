"use client"
import { useState } from "react"
import { useSpring, animated, config } from '@react-spring/web'
import { overlay } from "three/examples/jsm/nodes/Nodes.js";

function Nav() {
    const [isActive, setIsActive] = useState(false);


    return (
        <nav className="main-nav" >
            <div className="inner px">
                <h2></h2>
                <div
                    role="button"
                    className={`menu btn nav-btn ${isActive ? 'is-active' : 'non-active'}`}
                    onClick={() => setIsActive(!isActive)}
                >
                    <div className="open-info__icon">
                        <span className="horizontal-line line"></span>
                        <span className="vertical-line line"></span>
                    </div>
                    <section className="overlay-content">
                        <div className="overlay-inner px py fb">
                            <p>Hello ✋</p>
                            <div className="items">
                                <p>I'm currently in Wellington, New Zealand</p>
                                <p className="email" >email:
                                    <object className="email" width="292" height="27" data="/contact-e.svg" type="image/svg+xml"></object> </p>
                                <p className="phone" >whatsapp:  <object className="phone" width="171" height="20" data="/contact-p.svg" type="image/svg+xml"></object></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </nav>
    )
}

export default Nav