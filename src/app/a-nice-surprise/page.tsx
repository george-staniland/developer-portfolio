"use client"

import Footer from "../../../components/Footer"
import RandomGif from "../../../components/RandomGif"

async function getData() {
    const res = await fetch('https://api.giphy.com/v1/gifs/search?api_key=XUjSJZH02Up1UW1ApkHPGQjAcg6u6ZmS')
    if (!res.ok) {
        throw new Error('failed to fetch data')
    }
    console.log('hello')
    return res.json
}



export default function Surprise() {

    function getGif() {
        console.log('fetching!')
    }

    async function callAPI() {
        const res = await fetch('https://api.giphy.com/v1/gifs/search?api_key=XUjSJZH02Up1UW1ApkHPGQjAcg6u6ZmS')
        console.log(res)
        return res
    }


    return (
        <>
            <p>surpise page</p>
            <button onClick={callAPI}>get gif</button>
            <Footer />
        </>
    )
}