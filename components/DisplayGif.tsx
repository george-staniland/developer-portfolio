'use client'

import { useState, useEffect, use } from "react"
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
        const res = await fetch("http://localhost:3000/api/get-gif", { cache: 'no-store' })
        const url = await res.json();
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={styles.img} src={gifUrl} alt="text" />
                }
            </div>
            <button onClick={callRouteGifApi} className={styles.button}>New Gif!</button>
        </div>
    )
}