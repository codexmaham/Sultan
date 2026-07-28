"use client";

import { useEffect, useState } from "react";

/** Fired by Preloader.tsx the moment its zoom-through reveal finishes. */
export const PRELOADER_DONE_EVENT = "preloader:done";

/**
 * True once the preloader has finished (or immediately under reduced motion,
 * since the preloader never renders in that case). A defensive fallback timer
 * guarantees this never stays false forever even if the event is missed.
 *
 * Reads `prefers-reduced-motion` directly instead of `useReducedMotion` — that
 * hook defaults to `true` on first paint (to suppress motion flash), which
 * would otherwise mark the preloader done before it even appears.
 */
export function usePreloaderDone(): boolean {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mq.matches) {
      setDone(true);
      return;
    }

    const onDone = () => setDone(true);
    window.addEventListener(PRELOADER_DONE_EVENT, onDone);

    const onMotionChange = () => {
      if (mq.matches) setDone(true);
    };
    mq.addEventListener("change", onMotionChange);

    // Defensive fallback: never wait forever if the event is somehow missed.
    const fallback = setTimeout(() => setDone(true), 6500);

    return () => {
      window.removeEventListener(PRELOADER_DONE_EVENT, onDone);
      mq.removeEventListener("change", onMotionChange);
      clearTimeout(fallback);
    };
  }, []);

  return done;
}
