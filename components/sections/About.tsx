"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { StatCounter } from "@/components/motion/StatCounter";
import { useGsapContext } from "@/lib/useGsapContext";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/lib/smoothScroll";

/**
 * About / introduction — a true split panel echoing the official catalogue's
 * "About Us" page: a deep-green column with the gold "1989" numeral, beside a
 * cream column carrying the heading, copy, and stat block. On desktop the
 * numeral scrubs scale + opacity as the section passes through and lingers
 * via CSS `sticky`. Reduced motion → static numeral, final values shown
 * immediately (handled inside the child components).
 */
export function About() {
  const scope = useGsapContext((_self, el) => {
    const numeral = el.querySelector<HTMLElement>("[data-numeral]");
    if (!numeral) return;

    gsap.fromTo(
      numeral,
      { scale: 0.9, opacity: 0.55 },
      {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      },
    );
  });

  return (
    <section id="about" ref={scope} className="relative bg-cream">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Green column — numeral, sticky so it lingers while you scroll past */}
        <div className="grain relative bg-pine px-8 py-16 sm:px-12 md:col-span-5 md:px-12 md:py-24 lg:px-16">
          <div className="md:sticky md:top-28">
            <p className="eyebrow text-gold">{ABOUT.eyebrow}</p>
            <div
              data-numeral
              className="mt-4 origin-left font-display text-[clamp(6rem,15vw,11rem)] font-medium leading-[0.8] tracking-tighter text-gold"
            >
              {ABOUT.year}
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/60">
              A legacy in every grain, from one mill in Sialkot to a group of
              five.
            </p>
          </div>
        </div>

        {/* Cream column — copy */}
        <div className="bg-cream px-8 py-16 sm:px-12 md:col-span-7 md:px-12 md:py-24 lg:px-16 lg:pl-20">
          <SplitText
            as="h2"
            text={ABOUT.heading}
            className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.02] tracking-tight text-pine"
          />

          <div className="mt-8 max-w-xl space-y-5">
            {ABOUT.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-base leading-relaxed text-espresso/75"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <button
            onClick={() => scrollToSection(ABOUT.readMore.target)}
            className="link-underline mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest"
          >
            {ABOUT.readMore.label}
            <span aria-hidden="true">→</span>
          </button>

          {/* Stat block */}
          <dl className="mt-14 grid grid-cols-1 gap-8 border-t border-stone/70 pt-10 sm:grid-cols-3">
            {ABOUT.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-medium leading-none text-pine">
                    <StatCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.suffix === "%" ? 1 : 0}
                      isYear={"isYear" in s ? Boolean(s.isYear) : false}
                    />
                  </span>
                  <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.15em] text-espresso/55">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
