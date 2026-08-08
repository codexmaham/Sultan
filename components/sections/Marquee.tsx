"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { IMAGES } from "@/lib/content";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Infinite photo marquee whose speed and direction respond to scroll velocity:
 * it drifts gently when idle, speeds up while scrolling, and flips direction with
 * scroll direction. A self-contained rAF loop (cleaned up on unmount). Reduced
 * motion → a static, horizontally-scrollable strip with no animation.
 */
export function Marquee() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const images = IMAGES.marquee;
  const doubled = [...images, ...images];

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let offset = 0;
    let velocity = 0; // extra speed injected by scrolling
    let direction = -1; // -1 drifts left
    let lastScroll = window.scrollY;
    const baseSpeed = 0.4; // px per frame at idle

    const onScroll = () => {
      const now = window.scrollY;
      const delta = now - lastScroll;
      lastScroll = now;
      if (delta !== 0) direction = delta > 0 ? -1 : 1;
      velocity = Math.min(Math.abs(delta) * 0.35, 14);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const halfWidth = () => track.scrollWidth / 2;

    const tick = () => {
      velocity *= 0.92; // decay back toward idle drift
      offset += (baseSpeed + velocity) * direction;
      const half = halfWidth();
      if (half > 0) {
        // wrap seamlessly
        if (offset <= -half) offset += half;
        if (offset >= 0) offset -= half;
      }
      track.style.transform = `translate3d(${offset}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      id="gallery"
      aria-label="Gallery: a glimpse across our companies"
      className="relative -mt-1 overflow-hidden border-y border-stone/60 bg-cream py-8 lg:mt-0"
    >
      <div
        ref={trackRef}
        className={`flex w-max gap-5 ${
          reduced ? "overflow-x-auto pb-2" : "will-change-transform"
        }`}
      >
        {doubled.map((src, i) => {
          const isMillPic = src.includes("mill-pic");
          return (
          <figure
            key={`${src}-${i}`}
            className={`relative shrink-0 overflow-hidden rounded-[2px] bg-stone/40 ${
              isMillPic
                ? "h-48 w-[min(92vw,56rem)] sm:h-64 sm:w-[min(92vw,64rem)]"
                : "h-44 w-72 sm:h-56 sm:w-96"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes={isMillPic ? "92vw" : "(max-width: 640px) 18rem, 24rem"}
              className={isMillPic ? "object-cover object-center" : "object-cover"}
              // decorative bridge imagery; content is announced by the section label
              aria-hidden="true"
            />
          </figure>
        );
        })}
      </div>
    </section>
  );
}
