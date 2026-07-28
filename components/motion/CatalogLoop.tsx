"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type CatalogSlide = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  tag: string;
};

type CatalogLoopProps = {
  slides: readonly CatalogSlide[];
  label?: string;
  className?: string;
};

const AUTO_MS = 5200;

/**
 * Editorial facility catalog — auto-looping hero frame, crossfaded slides with
 * a gentle Ken Burns drift, thumbnail rail, and full keyboard / reduced-motion
 * support. Built to read like a premium industrial catalogue spread.
 */
export function CatalogLoop({
  slides,
  label = "Facility Catalog",
  className,
}: CatalogLoopProps) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    if (reduced || paused || total <= 1) return;
    const t = setInterval(() => go(index + 1), AUTO_MS);
    return () => clearInterval(t);
  }, [index, paused, reduced, go, total]);

  const active = slides[index];

  return (
    <div
      className={`flex flex-col ${className ?? ""}`}
      role="region"
      aria-label={label}
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      tabIndex={0}
    >
      {/* Catalog frame — grows to fill the column on desktop */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[3px] border border-stone/70 bg-[#FBF7EF] shadow-[0_24px_64px_-28px_rgba(23,19,15,0.35)]">
        {/* Masthead */}
        <div className="grain flex items-center justify-between border-b border-cream/10 bg-pine px-4 py-3 sm:px-5">
          <span className="eyebrow text-gold">{label}</span>
          <span
            className="font-display text-sm tabular-nums tracking-wide text-cream/80"
            aria-live="polite"
            aria-atomic="true"
          >
            {String(index + 1).padStart(2, "0")}
            <span className="text-cream/35"> / </span>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Hero viewport — fixed aspect on mobile, flex-fill on desktop */}
        <div className="relative min-h-[240px] flex-1 overflow-hidden bg-espresso/5 aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto">
          {/* Progress bar */}
          {!reduced && !paused && (
            <motion.div
              key={index}
              className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left bg-gold"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
              aria-hidden="true"
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={active.src}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <motion.div
                className="relative h-full w-full"
                initial={reduced ? false : { scale: 1 }}
                animate={reduced ? undefined : { scale: 1.06 }}
                transition={
                  reduced
                    ? undefined
                    : { duration: AUTO_MS / 1000, ease: "linear" }
                }
              >
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="object-cover"
                />
              </motion.div>

              {/* Vignette + tag */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-espresso/10"
              />
              <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-espresso/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
                {active.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Prev / next */}
          <div className="absolute inset-y-0 right-0 z-10 flex flex-col justify-center gap-2 pr-3">
            <CatalogControl label="Previous slide" onClick={() => go(index - 1)}>
              ←
            </CatalogControl>
            <CatalogControl label="Next slide" onClick={() => go(index + 1)}>
              →
            </CatalogControl>
          </div>
        </div>

        {/* Caption block */}
        <div className="shrink-0 border-t border-stone/50 px-4 py-5 sm:px-5 sm:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="font-display text-xl font-medium tracking-tight text-espresso sm:text-2xl">
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/65">
                {active.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div
        className="mt-4 shrink-0 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label="Choose catalog slide"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            role="tab"
            aria-selected={i === index}
            aria-label={`${slide.title}, slide ${i + 1} of ${total}`}
            onClick={() => go(i)}
            className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-[2px] border transition-all duration-300 sm:h-16 sm:w-20 ${
              i === index
                ? "border-gold ring-2 ring-gold/30"
                : "border-stone/60 opacity-70 hover:border-espresso/30 hover:opacity-100"
            }`}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              sizes="5rem"
              className="object-cover"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function CatalogControl({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 bg-espresso/30 text-sm text-cream backdrop-blur-sm transition-colors hover:border-cream/50 hover:bg-espresso/50"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
