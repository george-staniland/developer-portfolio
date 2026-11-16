"use client";

import { useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Match site breakpoint: smooth scroll off on touch viewports narrower than this. */
const LENIS_MIN_WIDTH_PX = 996;

function isTouchDevice() {
  return (
    window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
    navigator.maxTouchPoints > 0
  );
}

function shouldEnableLenis() {
  const isNarrow = window.innerWidth < LENIS_MIN_WIDTH_PX;
  return !(isNarrow && isTouchDevice());
}

function useLenisEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(shouldEnableLenis());
    update();

    const narrowMq = window.matchMedia(
      `(max-width: ${LENIS_MIN_WIDTH_PX - 1}px)`,
    );
    const touchMq = window.matchMedia("(hover: none) and (pointer: coarse)");

    narrowMq.addEventListener("change", update);
    touchMq.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      narrowMq.removeEventListener("change", update);
      touchMq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return enabled;
}

/**
 * Drives Lenis from the GSAP ticker and keeps ScrollTrigger in sync.
 * Rendered inside <ReactLenis> so `useLenis` re-renders once the instance exists.
 */
function GsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    ScrollTrigger.refresh();

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

/** Keeps ScrollTrigger in sync when Lenis is off (native scroll). */
function NativeScrollSync() {
  useEffect(() => {
    const onScroll = () => ScrollTrigger.update();
    window.addEventListener("scroll", onScroll, { passive: true });
    ScrollTrigger.refresh();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const lenisEnabled = useLenisEnabled();

  if (!lenisEnabled) {
    return (
      <>
        <NativeScrollSync />
        {children}
      </>
    );
  }

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
