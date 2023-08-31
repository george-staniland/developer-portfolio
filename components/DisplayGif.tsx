'use client'

import { useState, useEffect } from "react"
import Image from "next/image";
import styles from './displaygif.module.css';


export default function DisplayGif() {

    const [gifUrl, setGifUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState('Loading GIF..')

    useEffect(() => {
        callRouteGifApi()
    }, []);

    async function callRouteGifApi() {
        setIsLoading(true);
        const res = await fetch("/api/get-gif", { cache: 'no-cache' })
        if (!res.ok) {
            setLoadingStatus('GIF loading error :(')
            return Promise.reject('Network or HTTP error')
        }
        const url = await res.json();
        setLoadingStatus('Loading GIF..');
        setGifUrl(url);
        setIsLoading(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.imageWrap}>
                {isLoading ?
                    <div className={styles.spinner}>
                        <h3>{loadingStatus}</h3>
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