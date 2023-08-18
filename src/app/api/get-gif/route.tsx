import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const gifUrl = "https://api.giphy.com/v1/gifs/random?api_key=XUjSJZH02Up1UW1ApkHPGQjAcg6u6ZmS&tag=cute&rating=g";

    const res = await fetch(gifUrl, { cache: 'no-store', });
    const data = await res.json();
    return NextResponse.json({ data })
}