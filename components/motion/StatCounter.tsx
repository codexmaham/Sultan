"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  /** Decimal places to show (e.g. 1 for 94.5%). */
  decimals?: number;
  /** Render as a plain year — no thousands separator. */
  isYear?: boolean;
  className?: string;
  duration?: number;
};

/**
 * Counts up to `value` once when scrolled into view. Reduced-motion users see
 * the final number immediately. The number is real text, so it's selectable
 * and readable by assistive tech throughout.
 */
export function StatCounter({
  value,
  suffix = "",
  decimals = 0,
  isYear = false,
  className,
  duration = 1600,
}: StatCounterProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic-out

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(value * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setDisplay(value);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  const formatted = isYear
    ? Math.round(display).toString()
    : display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

  return (
    <span ref={ref} className={className}>
      {formatted}
      {suffix}
    </span>
  );
}
