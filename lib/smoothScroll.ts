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

/** Jump or smooth-scroll to the top. Used on route changes and after overlays. */
export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/**
 * Smooth-scroll to a section id (or the top). Falls back to native scrolling
 * when Lenis isn't available (reduced motion, SSR hydration gap, no JS).
 * On sub-pages, navigates to the homepage hash instead of scrolling nowhere.
 */
export function scrollToSection(target: string) {
  const top = target === "top";
  const onHome =
    typeof window !== "undefined" && window.location.pathname === "/";
  const el = top ? null : document.getElementById(target);

  if (onHome && (top || el)) {
    if (lenis) {
      lenis.scrollTo(top ? 0 : el!, { offset: top ? 0 : -1 });
    } else if (top) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      el!.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  window.location.assign(top ? "/" : `/#${target}`);
}
