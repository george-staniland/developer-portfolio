'use client'

import { useState } from "react"
import Image from "next/image";

interface Props {
    gifUrl: string;
}

export default function DisplayGif(props: Props) {
    const { gifUrl } = props;
    const [gifState, setGifState] = useState(gifUrl);

    async function getNewGif() {
        const res = await fetch("http://localhost:3000/api/get-gif")
        const data = await res.json();
        console.log(data);
        const url = data.data.data.images.original.webp
        setGifState(url);
    }

    return (
        <div>
            <Image src={gifState} width={500} height={500} alt="test" priority />
            <button onClick={getNewGif}>New Gif!</button>
        </div>
    )
}