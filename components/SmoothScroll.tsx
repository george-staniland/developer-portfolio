"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives Lenis from the GSAP ticker and keeps ScrollTrigger in sync.
 * Rendered inside <ReactLenis> so `useLenis` re-renders once the instance exists.
 */
function GsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

/**
 * Global Lenis smooth scroll provider.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis 
      root 
      options={{
        autoRaf: false,
        lerp: 0.15,
        wheelMultiplier: 1,
      }} 
    >
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
