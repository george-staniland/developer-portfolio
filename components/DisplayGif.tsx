'use client'

import { useState, useEffect } from "react"
import Image from "next/image";
import styles from './displaygif.module.css';


export default function DisplayGif() {

    const [gifUrl, setGifUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        callRouteGifApi()
    }, []);

    async function callRouteGifApi() {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/api/get-gif", { cache: 'no-cache' })
        const url = await res.json();
        console.log(url)
        setGifUrl(url);
        setIsLoading(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrap}>
                {isLoading ?
                    <div className={styles.spinner}>
                        <h3>Loading GIF...</h3>
                    </div>
                    :
                    <Image
                        className={styles.img}
                        src={gifUrl}
                        alt="text"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                }
            </div>
            <button onClick={callRouteGifApi} className={styles.button}>New Gif!</button>
        </div>
    )
}