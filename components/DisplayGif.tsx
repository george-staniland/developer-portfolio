'use client'

import { useState, useEffect } from "react"
import Image from "next/image";
import styles from './styles/displaygif.module.css';


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
        const data = await res.json();
        setLoadingStatus('Loading GIF..');
        setGifUrl(data.url);
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

                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className={styles.img}
                        src={gifUrl}
                        loading="eager"
                        alt="A gif from giphy.com"
                    />
                }
            </div>
            <button onClick={callRouteGifApi} className={styles.button}>New Gif!</button>
            <div className={styles.giphy_text}>
                <h6>Powered by GIPHY API</h6>
            </div>
        </div>
    )
}