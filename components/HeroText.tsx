
"use client"

import styles from './herotext.module.css'
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
            <div>
                <h1 className={styles.text_1}>Hello, my name is George,</h1>
                <span className={`${styles.inline_gif_wrap} ${styles.gif_1}`}>
                    <Image src="/test.gif" className={styles.inline_gif} fill alt="Gif from Giphy"></Image>
                </span>
            </div>
            <div>
                <h1 className={styles.text_1}>I&apos;m a front-end developer.</h1>
            </div>
            <div className={styles.section_2}>
                <div>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_2}`}>
                        <Image src="/fireworks.webp" className={styles.inline_gif} fill alt="Gif from Giphy"></Image>
                    </span>
                    <h1>I like crafting beautiful, intuitive experiences with code.</h1>
                </div>
                <div>
                    <h1>I also enjoy photography,</h1>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_3}`}>
                        <Image src="/photo.gif" className={styles.inline_gif} fill alt="Gif from Giphy"></Image>
                    </span>
                </div>
                <div>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_4}`}>
                        <Image src="/dog.gif" className={styles.inline_gif} fill alt="Gif from Giphy"></Image>
                    </span>
                    <h1>seeing my dog </h1>
                    <h1>,and traveling </h1>
                    <span className={`${styles.inline_gif_wrap} ${styles.gif_5}`}>
                        <Image src="/travel.gif" className={styles.inline_gif} fill alt="Gif from Giphy"></Image>
                    </span>
                </div>
            </div>
        </div >
    )
}

function Mobile() {
    return (
        < div className={`${styles.hero_text_container_mobile}`}>
            <h1>
                <span>Hello. My name is George, I&apos;m a front&#x2011;end developer.</span>
            </h1>
            <div className={styles.hero_2}>
                <h1>
                    I like crafting beautiful, intuitive experiences with code. I also enjoy photography, seeing my dog, and traveling.
                </h1>
            </div>
            <div className={styles.gif_wrap}>
                <Image src="/fireworks.webp" fill alt="man waving gif" />
            </div>
        </div >
    )
}