"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  resolvePendingScrollTarget,
  scrollToTop,
  setAppRouter,
  setLenis,
  tryScrollToTarget,
} from "@/lib/smoothScroll";
import { usePreloaderDone } from "@/lib/usePreloaderDone";
import { useReducedMotion } from "@/lib/useReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function RouterRegistration() {
  const router = useRouter();

  useEffect(() => {
    setAppRouter(router);
    return () => setAppRouter(null);
  }, [router]);

  return null;
}

/**
 * Reset scroll on sub-pages; on the homepage honour pending section targets
 * after the preloader finishes and the section DOM is ready.
 */
function RouteScrollManager() {
  const pathname = usePathname();
  const preloaderDone = usePreloaderDone();
  const handledPathRef = useRef<string | null>(null);

  // Only reset scroll when the route changes — not when preloaderDone flips.
  useEffect(() => {
    if (handledPathRef.current === pathname) return;
    handledPathRef.current = pathname;

    if (pathname !== "/") {
      scrollToTop(true);
      window.scrollTo(0, 0);
      return;
    }

    const hash = window.location.hash.slice(1);
    if (!hash) {
      scrollToTop(true);
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/" || !preloaderDone) return;

    const target = resolvePendingScrollTarget();
    if (!target) return;

    let attempts = 0;
    let raf = 0;

    const tick = () => {
      if (tryScrollToTarget(target)) return;
      if (++attempts >= 40) return;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pathname, preloaderDone]);

  return null;
}

/**
 * Global smooth scrolling.
 *
 * Lenis is driven from GSAP's ticker so ScrollTrigger and Lenis share one loop.
 * scrollerProxy is registered in layout effect so it exists before child
 * ScrollTriggers initialise.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
    }

    if (reducedMotion) {
      setLenis(null);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    setLenis(lenis);
    if (process.env.NODE_ENV !== "production") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    const root = document.documentElement;

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length && value != null) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Transform pinning works reliably with Lenis on mobile Safari.
      pinType: "transform",
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return (
    <>
      <RouterRegistration />
      <RouteScrollManager />
      {children}
    </>
  );
}
