"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { getLenis } from "@/lib/smoothScroll";
import { SITE } from "@/lib/content";

/**
 * Brand preloader: a numeral ticks from 0 up to the founding year, then a
 * two-panel curtain wipes away with a clip-path to reveal the hero. Entirely
 * skipped for reduced-motion users (nothing renders, scroll is never locked).
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "wipe" | "done">("counting");
  const [show, setShow] = useState(true);
  const startedRef = useRef(false);

  // Once counting reaches the year, hold briefly, then let the curtain exit.
  useEffect(() => {
    if (reduced || phase !== "wipe") return;
    const t = setTimeout(() => setShow(false), 550);
    return () => clearTimeout(t);
  }, [reduced, phase]);

  // Failsafe: the counter and curtain run on requestAnimationFrame, which the
  // browser pauses in background tabs. A timer (which still fires when hidden)
  // guarantees the preloader can never permanently cover the page.
  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => {
      setShow(false);
      setPhase("done");
    }, 4500);
    return () => clearTimeout(t);
  }, [reduced]);

  // Lock scroll while the curtain is up.
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
      else setPhase("wipe");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (reduced || phase === "done") return null;

  return (
    <AnimatePresence onExitComplete={() => setPhase("done")}>
      {show && (
        <motion.div
          key="preloader"
          className="grain fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-espresso text-cream"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-hidden="true"
        >
          <div className="relative z-[2] flex flex-col items-center gap-6">
            <span className="eyebrow text-gold">{SITE.shortName}</span>
            <motion.span
              className="font-display text-[18vw] leading-none tracking-tight sm:text-[12rem]"
              animate={
                phase === "wipe"
                  ? { y: -20, opacity: 0 }
                  : { y: 0, opacity: 1 }
              }
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {count}
            </motion.span>
          </div>

          {/* thin progress rule */}
          <motion.div
            className="absolute bottom-16 left-1/2 h-px w-40 -translate-x-1/2 origin-left bg-gold/50"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: count / SITE.founded }}
            transition={{ ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
