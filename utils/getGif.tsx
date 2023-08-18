export default async function getGif() {
    const gifUrl = "https://api.giphy.com/v1/gifs/random?api_key=XUjSJZH02Up1UW1ApkHPGQjAcg6u6ZmS&tag=cute&rating=g";

    const res = await fetch(gifUrl, { cache: 'no-store', });
    const json = await res.json();
    return json.data.images.original.webp
}