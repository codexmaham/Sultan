"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "framer-motion";
import { TESTIMONIALS, type Testimonial } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { useReducedMotion } from "@/lib/useReducedMotion";

const AUTO_MS = 5500;

/**
 * "Voices of Trust" — a draggable, auto-advancing testimonial carousel. Cards
 * tilt subtly in 3D on hover. Fully keyboard-operable (arrow keys + prev/next
 * buttons), auto-advance pauses on hover/focus/interaction, and everything
 * degrades to a static, swipeable list under reduced motion.
 */
export function Testimonials() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total],
  );

  // Auto-advance.
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => go(index + 1), AUTO_MS);
    return () => clearInterval(t);
  }, [index, paused, reduced, go]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const threshold = 60;
    if (info.offset.x < -threshold) go(index + 1);
    else if (info.offset.x > threshold) go(index - 1);
  };

  return (
    <section
      id="testimonials"
      className="relative bg-cream py-[var(--spacing-section)]"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-gold">Testimonials</p>
            <SplitText
              as="h2"
              text="Voices of Trust"
              className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-espresso"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <CarouselButton label="Previous testimonial" onClick={() => go(index - 1)}>
              ←
            </CarouselButton>
            <CarouselButton label="Next testimonial" onClick={() => go(index + 1)}>
              →
            </CarouselButton>
          </div>
        </div>

        {/* Track */}
        <div
          ref={regionRef}
          className="relative mt-12 overflow-hidden"
          tabIndex={0}
          role="group"
          aria-label={`Testimonial ${index + 1} of ${total}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(index + 1);
            if (e.key === "ArrowLeft") go(index - 1);
          }}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${index * 100}%` }}
            transition={
              reduced
                ? { duration: 0 }
                : { type: "spring", stiffness: 220, damping: 30 }
            }
            drag={reduced ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragStart={() => setPaused(true)}
            onDragEnd={onDragEnd}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="w-full shrink-0 px-1"
                aria-hidden={i !== index}
              >
                <TiltCard reduced={reduced} testimonial={t} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2.5" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial from ${t.name}`}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-400 ${
                i === index ? "w-8 bg-gold" : "w-2 bg-stone hover:bg-espresso/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
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
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-stone text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
    >
      <span aria-hidden="true" className="text-lg">
        {children}
      </span>
    </button>
  );
}

function TiltCard({
  testimonial,
  reduced,
}: {
  testimonial: Testimonial;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRx = useSpring(rx, { stiffness: 200, damping: 18 });
  const springRy = useSpring(ry, { stiffness: 200, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.figure
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={
        reduced
          ? undefined
          : { rotateX: springRx, rotateY: springRy, transformPerspective: 1000 }
      }
      className="mx-auto max-w-3xl rounded-[3px] border border-stone/70 bg-[#FBF7EF] p-8 shadow-[0_20px_60px_-30px_rgba(23,19,15,0.4)] sm:p-12"
    >
      <span
        aria-hidden="true"
        className="font-display text-6xl leading-none text-gold"
      >
        &ldquo;
      </span>
      <blockquote className="mt-2 font-display text-[clamp(1.35rem,2.6vw,2rem)] font-medium leading-snug tracking-tight text-espresso">
        {testimonial.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-espresso font-display text-lg text-cream"
        >
          {testimonial.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="font-medium text-espresso">{testimonial.name}</span>
          <span className="text-sm text-espresso/60">
            {testimonial.role} · {testimonial.division}
          </span>
        </span>
      </figcaption>
    </motion.figure>
  );
}
