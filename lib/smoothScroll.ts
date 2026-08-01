"use client";

import type Lenis from "lenis";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * A tiny module-level handle to the single Lenis instance, so any component can
 * request a smooth scroll (nav links, "Back to Top", CTAs) without prop-drilling
 * a context through the whole tree. Set by SmoothScrollProvider.
 */
let lenis: Lenis | null = null;
let router: AppRouterInstance | null = null;
let pendingScrollTarget: string | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Registered by SmoothScrollProvider so nav can client-route to homepage sections. */
export function setAppRouter(instance: AppRouterInstance | null) {
  router = instance;
}

/** Jump or smooth-scroll to the top. Used on route changes and after overlays. */
export function scrollToTop(immediate = false) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

function performScroll(target: string): boolean {
  const top = target === "top";
  const el = top ? null : document.getElementById(target);

  if (!top && !el) return false;

  if (lenis) {
    lenis.scrollTo(top ? 0 : el!, { offset: top ? 0 : -1 });
  } else if (top) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    el!.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return true;
}

/**
 * Smooth-scroll to a section id (or the top). Falls back to native scrolling
 * when Lenis isn't available (reduced motion, SSR hydration gap, no JS).
 * On sub-pages, client-navigates to the homepage hash instead of scrolling nowhere.
 */
export function scrollToSection(target: string) {
  const onHome =
    typeof window !== "undefined" && window.location.pathname === "/";

  if (onHome && performScroll(target)) {
    return;
  }

  pendingScrollTarget = target;
  const href = target === "top" ? "/" : `/#${target}`;

  if (router) {
    router.push(href);
    return;
  }

  window.location.assign(href);
}

/** Read and clear a pending cross-page scroll target (or the current hash). */
export function resolvePendingScrollTarget(): string | null {
  const hash =
    typeof window !== "undefined" ? window.location.hash.slice(1) : "";
  const target = pendingScrollTarget ?? hash ?? null;
  pendingScrollTarget = null;
  return target;
}

/** Attempt scroll; returns false if the target section is not in the DOM yet. */
export function tryScrollToTarget(target: string): boolean {
  return performScroll(target);
}
