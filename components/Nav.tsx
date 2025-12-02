"use client"
import { useEffect, useState } from "react"
import EmailPic from "./EmailPic";
import PhonePic from "./PhonePic";
import { GiConfirmed } from "react-icons/gi";

function Nav() {
    const [isActive, setIsActive] = useState(false);

    const [copied, setCopied] = useState<{ email: boolean; phone: boolean }>({
        email: false,
        phone: false
    });

    useEffect(() => {
        if (isActive) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    },[isActive])


    async function handleCopy(key: "email" | "phone", text: string) {
        try {
            const clipboardItem = new ClipboardItem({ "text/plain": text });
            await navigator.clipboard.write([clipboardItem]);

           
            setCopied(prev => ({ ...prev, [key]: true }));

          
            setTimeout(() => {
                setCopied(prev => ({ ...prev, [key]: false }));
            }, 2000);
        } catch (err) {
            console.log('error copying')
        }
    }


    return (
        <nav className="main-nav" >
            <div 
                className="modal-backdrop" 
                onClick={() => setIsActive(!isActive)} 
                aria-label="toggle info modal"
                role="button"
            >
                
            </div>
            <div className="inner px">
                <span className="box"></span>
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
                            <p className="fb-small">Hello ✋</p>
                            <div className="items">
                                <p className="fb-small">I'm currently in Wellington, New Zealand.</p>
                                <p className="fb-small">For project enquires please reach out below.</p>
                                <div className="svgs-wrap">
                                    <EmailPic/>
                                    <PhonePic/>  
                                </div>
                            </div>
                            <div className="btns">

                                 <button 
                                 onClick={(e) => { 
                                    e.stopPropagation();
                                    handleCopy("email","georgestaniland@gmail.com");
                                }}
                                >
                                    Copy Email
                                    { copied.email && <GiConfirmed />}
                                </button>

                            
                                <button onClick={(e) => { 
                                    e.stopPropagation();
                                    handleCopy("phone","0225109709");
                                }}>
                                    Copy WhatsApp
                                    { copied.phone && <GiConfirmed />}
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