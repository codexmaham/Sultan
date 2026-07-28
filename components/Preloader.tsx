"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { getLenis } from "@/lib/smoothScroll";
import { PRELOADER_DONE_EVENT } from "@/lib/usePreloaderDone";
import { SITE } from "@/lib/content";

type Phase = "counting" | "zooming" | "done";

/**
 * Brand preloader: "1989" counts up, holds for a beat, then the numeral
 * zooms through automatically and fades to reveal the page underneath.
 * Entirely skipped for `prefers-reduced-motion`, and scroll is never locked
 * in that case. A hard failsafe guarantees it can never permanently cover
 * the page even if a background tab pauses requestAnimationFrame.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("counting");
  const startedRef = useRef(false);

  const progress = useMotionValue(0);
  const scale = useTransform(progress, [0, 1], [1, 32]);
  const contentOpacity = useTransform(progress, [0, 0.55, 1], [1, 1, 0]);
  const overlayOpacity = useTransform(progress, [0, 0.65, 1], [1, 1, 0]);

  // Count 0 → founding year.
  useEffect(() => {
    if (reduced || startedRef.current) return;
    startedRef.current = true;

    const target = SITE.founded;
    const duration = 1700;
    const start = performance.now();
    let raf = 0;

    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(target * ease(t)));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setPhase("zooming");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  // Failsafe #1: rAF pauses in background tabs, so a timer (which still fires
  // when hidden) guarantees counting can't hang forever.
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setPhase("zooming"), 4500);
    return () => clearTimeout(t);
  }, [reduced]);

  // Failsafe #2: an unconditional, phase-independent ceiling. The zoom
  // animation can itself stall if the tab is backgrounded mid-transition —
  // without this, scroll would stay locked forever in that case. This timer
  // always fires (setTimeout keeps running when hidden, unlike rAF) and force-
  // completes the reveal no matter what state the sequence is in.
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setPhase("done"), 6200);
    return () => clearTimeout(t);
  }, [reduced]);

  // Hold briefly on the finished numeral, then zoom through automatically.
  // No "already started" ref guard here on purpose: React (Strict Mode)
  // mounts, cleans up, and remounts this effect once in dev — a ref guard
  // would survive that cleanup while the timeout it protects gets cancelled,
  // permanently skipping the zoom and locking scroll. Letting the effect
  // re-arm itself on every real invocation is what makes it correct.
  useEffect(() => {
    if (reduced || phase !== "zooming") return;

    const hold = setTimeout(() => {
      animate(progress, 1, {
        duration: 1.3,
        ease: [0.76, 0, 0.24, 1],
        onComplete: () => setPhase("done"),
      });
    }, 450);
    return () => clearTimeout(hold);
  }, [reduced, phase, progress]);

  // Lock scroll until the zoom-through finishes.
  useEffect(() => {
    if (reduced || phase === "done") return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [reduced, phase]);

  // Let the rest of the page (the header's entrance animation) know the
  // reveal has finished.
  useEffect(() => {
    if (phase === "done") window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
  }, [phase]);

  if (reduced || phase === "done") return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Loading ${SITE.name}`}
      className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-pine text-cream"
      style={{ opacity: overlayOpacity }}
    >
      <motion.div
        aria-hidden="true"
        className="relative z-[2] flex flex-col items-center gap-6"
        style={{ opacity: contentOpacity }}
      >
        <span className="eyebrow text-gold">{SITE.preloaderTitle}</span>
        <motion.span
          className="font-display text-[18vw] leading-none tracking-tight sm:text-[12rem]"
          style={{ scale }}
        >
          {count}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
