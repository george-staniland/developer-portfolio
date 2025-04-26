
"use client"

import styles from './styles/herotext.module.css'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

export default function HeroText() {
    const [isClient, setIsClient] = useState(false);



    useEffect(() => {
        setIsClient(true)
    }, []);

    return isClient ? <TextBlock /> : false
}

function TextBlock() {
    const isMobile = useMediaQuery({ query: '(max-width: 749px)' })
    return (
        isMobile ? <Mobile /> : <Desktop />
    )
}

function Desktop() {
    return (
        < div className={styles.hero_text_container}>
            <div className={styles.text_block}>
                <h1 >Hello, my name is George,</h1>
                <span className={`${styles.inline_gif_wrap} ${styles.gif_1}`}>
                    <Image
                        src="/wave_small.gif"
                        className={styles.inline_gif}
                        fill
                        alt="Gif from Giphy"
                        sizes="70px"
                    />
                </span>
            </div>
            <div className={styles.text_block}>
                <h1>I&apos;m a front-end developer.</h1>
            </div>
            <div className={styles.section_2}>
                <div className={styles.text_block}>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_2}`}>
                        <Image
                            src="/fireworks.webp"
                            className={styles.inline_gif}
                            fill
                            sizes="70px"
                            alt="Gif from Giphy"
                        />
                    </span>
                    <h1>I like crafting beautiful, intuitive experiences with code.</h1>
                </div>
                <div className={styles.text_block}>
                    <h1>I also enjoy photography,</h1>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_3}`}>
                        <Image
                            src="/camera.gif"
                            className={styles.inline_gif}
                            fill
                            sizes="70px"
                            alt="Gif from Giphy" />
                    </span>
                </div>
                <div className={styles.text_block}>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_4}`}>
                        <Image
                            src="/pup.gif"
                            className={styles.inline_gif}
                            fill
                            alt="Gif from Giphy"
                            sizes="70px"
                        />
                    </span>
                    <h1>seeing my dog </h1>
                    <h1>,and wandering </h1>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_5}`}>
                        <Image
                            src="/run_resize.gif"
                            className={styles.inline_gif}
                            fill
                            sizes="70px"
                            alt="Gif from Giphy"
                        />
                    </span>
                </div>
            </div>
        </div >
    )
}

function Mobile() {
    return (
        < div className={`${styles.hero_text_container_mobile}`}>
            <div className={styles.hero_2}>
                <h1>
                    <span>Hello, my name is George, I&apos;m a front&#x2011;end developer. </span> <br /> I like crafting beautiful, intuitive experiences with code. I also enjoy photography, seeing my dog, and wandering.
                </h1>
            </div>
            <div className={styles.gif_wrap}>
                <Image src="/flowers.webp" fill alt="gif from giphy " title="gif from giphy.com" />
            </div>
        </div >
    )
}