"use client";

import type Lenis from "lenis";

/**
 * A tiny module-level handle to the single Lenis instance, so any component can
 * request a smooth scroll (nav links, "Back to Top", CTAs) without prop-drilling
 * a context through the whole tree. Set by SmoothScrollProvider.
 */
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Smooth-scroll to a section id (or the top). Falls back to native scrolling
 * when Lenis isn't available (reduced motion, SSR hydration gap, no JS).
 */
export function scrollToSection(target: string) {
  const top = target === "top";
  const el = top ? null : document.getElementById(target);

  if (lenis) {
    lenis.scrollTo(top ? 0 : (el ?? 0), { offset: top ? 0 : -1 });
    return;
  }

  if (top) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
