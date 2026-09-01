"use client"
import { useEffect, useState } from "react"
import EmailPic from "./EmailPic";
import PhonePic from "./PhonePic";
import { GiConfirmed } from "react-icons/gi";
import { usePathname } from 'next/navigation'


export function Svger() {
    return (
        <a href="/">
      <svg className="home-icon" fill="currentColor" viewBox="0 22.18 424.1 379.75">
  <path d="M351.191 401.923H72.901a8.126 8.126 0 0 1-8.129-8.129V242.262l-56.664-.114a8.13 8.13 0 0 1-7.495-5.023 8.14 8.14 0 0 1 1.764-8.852L206.104 24.546c1.853-1.845 4.503-2.666 7.047-2.276a8.13 8.13 0 0 1 5.731 3.942l47.43 47.43V58.499a8.126 8.126 0 0 1 8.129-8.129h47.755a8.127 8.127 0 0 1 8.129 8.129v79.156l91.39 91.398a8.14 8.14 0 0 1 1.764 8.868 8.13 8.13 0 0 1-7.511 5.007h-.016l-56.64-.114v150.98a8.11 8.11 0 0 1-8.121 8.129M81.03 385.666h262.033V234.67c0-2.162.854-4.235 2.39-5.755a8.13 8.13 0 0 1 5.739-2.374h.016l45.105.089-79.855-79.863a8.12 8.12 0 0 1-2.382-5.747V66.628h-31.498v26.645a8.13 8.13 0 0 1-5.015 7.511 8.1 8.1 0 0 1-8.86-1.764l-57.038-57.038-183.95 183.95 45.203.089a8.123 8.123 0 0 1 8.112 8.129z"/>
</svg>
        </a>
    );
  }

function Nav() {
    const [isActive, setIsActive] = useState(false);
    const PAGE_URL = usePathname()

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
            <div className="nav-inner px">

                { PAGE_URL != '/' &&
                    <div className="icon-wrap">
                        <Svger/>
                    </div>
                }

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
                                <p className="fb-small">I'm currently working remotely.</p>
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