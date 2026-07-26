"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HERO } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { ToggleButton } from "@/components/motion/ToggleButton";
import { useGsapContext } from "@/lib/useGsapContext";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Light, centered flour-mill hero: a "Since 1989" rule, the "Pure Flour, Perfect
 * Life" headline, a supporting subline, and two CTAs, over the mill building
 * blended into a wheat field. A gentle scroll parallax lifts the copy over the
 * image; reduced motion falls back to a simple fade.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const scope = useGsapContext((_self, el) => {
    const image = el.querySelector<HTMLElement>("[data-hero-image]");
    if (!image) return;
    gsap.to(image, {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section
      id="hero"
      ref={scope}
      className="relative overflow-hidden bg-[linear-gradient(180deg,#F5E9D3_0%,#ECD3A0_60%,#E6C888_100%)]"
      aria-label="Introduction"
    >
      {/* Wheat-field background — content-height on mobile; taller on desktop */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 lg:inset-x-0 lg:top-0 lg:h-[120vh] lg:bottom-auto"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)",
        }}
      >
        <Image
          src={HERO.background}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      {/* Light residual wash so the gold eyebrow stays legible right under
          the header, even where the masked photo has already faded in. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-24 bg-gradient-to-b from-cream/50 to-transparent" />

      {/* Centered intro copy */}
      <div className="container-page relative z-10 pt-3 text-center lg:pt-12">
        {/* Since rule */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.1 }}
          className="mx-auto mt-2 flex items-center justify-center gap-4 text-gold lg:mt-1"
        >
          <span className="h-px w-10 bg-gold/50 sm:w-16" />
          <span aria-hidden="true" className="text-[0.7rem]">
            ✦
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.35em]">
            {HERO.since}
          </span>
          <span aria-hidden="true" className="text-[0.7rem]">
            ✦
          </span>
          <span className="h-px w-10 bg-gold/50 sm:w-16" />
        </motion.div>

        <SplitText
          as="h1"
          text={HERO.headline}
          delay={reduced ? 0 : 0.25}
          className="mx-auto mt-4 max-w-4xl font-display text-[clamp(1.625rem,4.75vw,3rem)] font-medium leading-[0.98] tracking-tight text-espresso"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.55 }}
          className="mx-auto mt-4 max-w-xl whitespace-pre-line text-sm leading-relaxed text-espresso/70 sm:text-base"
        >
          {HERO.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduced ? 0 : 0.75 }}
          className="mt-4 mb-4 flex justify-center"
        >
          <div className="inline-flex overflow-hidden rounded-full shadow-[0_2px_16px_rgba(23,19,15,0.08)]">
            <ToggleButton
              target={HERO.primaryCta.target}
              variant="solid"
              hoverFill="white"
              circleColor="#F3E6C8"
              className="rounded-none rounded-l-full border-r border-espresso/10 !bg-[#F3E6C8] hover:!bg-[#F3E6C8]"
            >
              {HERO.primaryCta.label}
            </ToggleButton>
            <ToggleButton
              target={HERO.secondaryCta.target}
              variant="outline"
              circleColor="#F3E6C8"
              disableHover
              className="rounded-none rounded-r-full border-l-0"
            >
              {HERO.secondaryCta.label}
            </ToggleButton>
          </div>
        </motion.div>

        {/* Mill building — full viewport width, flush below CTAs */}
        <div className="relative z-[1] -mt-6 w-screen max-w-none -translate-x-1/2 left-1/2 max-lg:mb-0 lg:-mt-12">
          <div data-hero-image className="relative w-full leading-none">
            <Image
              src={HERO.image}
              alt={HERO.imageAlt}
              width={1381}
              height={762}
              sizes="100vw"
              className="block h-auto w-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Curved brown base sweep — desktop only; mobile goes straight into gallery */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-20 w-full sm:h-28 lg:block"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="heroBaseSweep" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6b4a26" stopOpacity="0" />
            <stop offset="40%" stopColor="#5a3d22" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#2f2013" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 Q720,-10 1440,60 L1440,120 L0,120 Z"
          fill="url(#heroBaseSweep)"
        />
      </svg>
    </section>
  );
}
