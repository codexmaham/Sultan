"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { StatCounter } from "@/components/motion/StatCounter";
import { useGsapContext } from "@/lib/useGsapContext";
import { gsap } from "@/lib/gsap";
import { scrollToSection } from "@/lib/smoothScroll";

/**
 * About / introduction. A split layout with an oversized serif "1989". On
 * desktop the section pins briefly while the numeral scrubs scale + opacity;
 * a stat block counts up on enter. Reduced motion → no pin, static numeral,
 * final numbers shown immediately (handled inside the child components).
 */
export function About() {
  const scope = useGsapContext((_self, el) => {
    const numeral = el.querySelector<HTMLElement>("[data-numeral]");
    if (!numeral) return;

    // Scrub the numeral's scale + opacity as the section passes through. The
    // column is kept in view with CSS `sticky` (below) rather than a GSAP pin,
    // which keeps it inside the grid flow and never detaches its position.
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
    <section
      id="about"
      ref={scope}
      className="relative bg-cream py-[var(--spacing-section)]"
    >
      <div className="container-page grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8">
        {/* Numeral column — sticky so it lingers briefly while you scroll past */}
        <div
          data-numeral-col
          className="md:sticky md:top-28 md:col-span-5 md:self-start"
        >
          <p className="eyebrow text-gold">{ABOUT.eyebrow}</p>
          <div
            data-numeral
            className="mt-4 origin-left font-display text-[clamp(6rem,18vw,15rem)] font-medium leading-[0.8] tracking-tighter text-espresso"
          >
            {ABOUT.year}
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-espresso/60">
            A legacy in every grain, from one mill in Sialkot to a group of four.
          </p>
        </div>

        {/* Copy column */}
        <div className="md:col-span-7 md:pt-6">
          <SplitText
            as="h2"
            text={ABOUT.heading}
            className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.4rem)] font-medium leading-[1.02] tracking-tight text-espresso"
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
                  <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-medium leading-none text-espresso">
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
