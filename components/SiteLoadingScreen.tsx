import { useEffect, useState } from 'react';

export default function SiteLoadingScreen () {
    const [ hashes, setHashes] = useState('#')

    useEffect(()=> {

        const id = setInterval (() => { 
            setHashes((prev) => prev + '#');
         },500 );

        return () => clearInterval(id)
    },[])

    return (
        <section className="site-loading-screen">
            <div className="text-wrap">
                <p>Loading: <span className="hashes">{hashes}</span></p> 
            </div>
        </section>
    )
}