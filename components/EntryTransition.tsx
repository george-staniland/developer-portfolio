'use client';

import { useState, useLayoutEffect } from 'react';
import { flushSync } from 'react-dom';
import SiteLoadingScreen from './SiteLoadingScreen';

const ENTRY_DELAY_MS = 2300;

export default function EntryTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (cancelled) return;

      const reveal = () => {
        flushSync(() => setIsMounted(true));
      };

      if (!document.startViewTransition) {
        reveal();
        return;
      }

      const transition = document.startViewTransition(reveal);
      // Preempted transitions reject with AbortError; silence to avoid console noise.
      transition.ready.catch(() => {});
      transition.finished.catch(() => {});
    }, ENTRY_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  if (!isMounted) {
    return <SiteLoadingScreen />;
  }

  return <>{children}</>;
}