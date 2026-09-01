'use client';

import { useState, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import SiteLoadingScreen from './SiteLoadingScreen';

export default function EntryTransition ({children} : { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useLayoutEffect(()=> {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        async function triggerDelayedEntry() {
            // 1. Hold the loading state for 4,000 milliseconds
            await delay(2300);
      
          
            if (!document.startViewTransition) {
              setIsMounted(true);
              return;
            }
      
            const transition = document.startViewTransition(() => {
                flushSync(()=> {
                    setIsMounted(true)
                })
            });

            transition.finished.catch(()=> {
                console.log('catch')
            })
        }
        triggerDelayedEntry();
    },[])

    if (!isMounted) {
        return (
            <SiteLoadingScreen/>
        )
    }

    return <>{children}</>;
}