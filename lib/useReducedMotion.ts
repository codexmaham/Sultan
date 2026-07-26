"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `prefers-reduced-motion` hook.
 * Returns `true` when the user has asked for reduced motion. Defaults to `true`
 * during SSR / first paint so we never flash motion before we've checked.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
