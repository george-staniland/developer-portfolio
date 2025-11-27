"use client"
import { useState } from "react"
import { useSpring, animated, config } from '@react-spring/web'
import { overlay } from "three/examples/jsm/nodes/Nodes.js";

function Nav() {
    const [isActive, setIsActive] = useState(false);


    const handleCopy = (value: string) => {
        navigator.clipboard.writeText(value)
            .then(() => {
                console.log("Copied:", value);
            })
            .catch(err => {
                console.error("Failed to copy:", err);
            });
    };


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
                        <div className="overlay-inner px py ">
                            <p className="fb">Hello ✋</p>
                            <div className="items">
                                <p className="fb">I'm currently in Wellington, New Zealand</p>
                                <p className="email fb" >email:
                                    <object className="email" width="270" height="24" data="/contact-e.svg" type="image/svg+xml"></object> </p>
                                <p className="phone fb" >whatsapp:  <object className="phone" width="150" height="17" data="/contact-p.svg" type="image/svg+xml"></object></p>
                            </div>
                            <div className="btns">
                                
                                 <button onClick={(e) => { 
                                    e.stopPropagation();
                                    handleCopy("georgestaniland@gmail.com");
                                }}>
                                    Copy email
                                </button>

                            
                                <button onClick={(e) => { 
                                    e.stopPropagation();
                                    handleCopy("0225109709");
                                }}>
                                    Copy WhatsApp
                                </button>

                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </nav>
    )
}

export default Nav