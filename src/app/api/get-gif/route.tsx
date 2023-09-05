export const revalidate = 0

import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const gifUrl = "https://api.giphy.com/v1/gifs/random?api_key=XUjSJZH02Up1UW1ApkHPGQjAcg6u6ZmS&tag=cute&rating=g";
    const res = await fetch(gifUrl, { cache: 'no-cache' });
    const json = await res.json();
    const url = json.data.images.downsized.url;
    const preview = json.data.images.fixed_width_small_still.url;
    const data = {
        url: url,
        preview: preview,
    }
    return NextResponse.json(data)
}