"use client";

import { useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToSection, scrollToTop, setLenis } from "@/lib/smoothScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Reset Lenis + native scroll on every route change; honour home-page hashes. */
function RouteScrollReset() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    scrollToTop(true);
    window.scrollTo(0, 0);

    const hash = window.location.hash.slice(1);
    if (hash && pathname === "/") {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [pathname]);

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
      <RouteScrollReset />
      {children}
    </>
  );
}
