"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs GSAP/ScrollTrigger setup inside a scoped gsap.context so every tween and
 * trigger created within is reverted automatically on unmount — no leaked
 * ScrollTriggers across route changes. Skips entirely under reduced motion.
 *
 * The callback receives the scope element. Return nothing; cleanup is automatic.
 */
export function useGsapContext(
  setup: (self: gsap.Context, scope: HTMLElement) => void,
  deps: unknown[] = [],
): RefObject<HTMLDivElement | null> {
  const scope = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduced || !scope.current) return;
    const el = scope.current;

    const ctx = gsap.context((self) => setup(self, el), el);

    // Recalculate after Lenis proxy + images/fonts settle.
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);
    const ro = new ResizeObserver(() => {
      // debounce a touch to avoid thrash during continuous resize
      window.clearTimeout((ro as unknown as { _t?: number })._t);
      (ro as unknown as { _t?: number })._t = window.setTimeout(refresh, 200);
    });
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      ro.disconnect();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return scope;
}
