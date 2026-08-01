"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { getLenis, scrollToTop } from "@/lib/smoothScroll";

/** Playback speed for the reel — a touch faster than real-time. */
const PLAYBACK_RATE = 1.4;

/** Video is 10s at 1x; buffer covers the sped-up runtime plus a slow start. */
const FAILSAFE_MS = 9500;

/**
 * Full-screen preloader for the Flour Mills detail page: a grain of wheat
 * morphing into flour, playing once before the page underneath is revealed.
 * Skippable (click anywhere, Escape, or the Skip button) and backed by a hard
 * failsafe timer so it can never outlast the video or get stuck — the timer
 * logic here is deliberately simple (no "already started" ref guards), since
 * such a guard is what caused the homepage preloader to lock scroll earlier.
 * Entirely skipped under `prefers-reduced-motion`.
 */
export function MillIntroReel() {
  const reduced = useReducedMotion();
  const [show, setShow] = useState(true);

  const finish = () => {
    scrollToTop(true);
    window.scrollTo(0, 0);
    setShow(false);
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // Ensure we start at the top — homepage scroll position can carry over via Lenis.
  useEffect(() => {
    scrollToTop(true);
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll while the reel plays.
  useEffect(() => {
    if (reduced || !show) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [reduced, show]);

  // Hard failsafe, independent of the video's own `ended` event.
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(finish, FAILSAFE_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  // Escape key also skips.
  useEffect(() => {
    if (reduced || !show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced, show]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="mill-intro"
          role="dialog"
          aria-modal="true"
          aria-label="Loading Saghir Sultan Flour Mills"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-pine"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          onClick={finish}
        >
          <video
            className="h-full w-full object-contain sm:object-cover"
            src="/images/mill-intro.mp4"
            poster="/images/mill-intro-poster.jpg"
            autoPlay
            muted
            playsInline
            onEnded={finish}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = PLAYBACK_RATE;
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pine/55 via-transparent to-transparent" />

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-8 right-8 z-10 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream/70 underline underline-offset-4 hover:text-cream"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
