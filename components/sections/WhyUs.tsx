"use client";

import { motion } from "framer-motion";
import { WHY_US, WHY_US_CATALOG } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { CatalogLoop } from "@/components/motion/CatalogLoop";

/**
 * "Why work with us" — copy plus a six-point value grid, beside an auto-looping
 * facility catalog that showcases the mill's Swiss-grade infrastructure.
 */
export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative bg-cream py-[var(--spacing-section)]"
    >
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-stretch lg:gap-10">
        {/* Copy + values */}
        <div className="flex flex-col lg:col-span-7">
          <p className="eyebrow text-gold">{WHY_US.eyebrow}</p>
          <SplitText
            as="h2"
            text={WHY_US.heading}
            className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-medium leading-[0.98] tracking-tight text-espresso"
          />

          <div className="mt-8 max-w-xl space-y-5">
            {WHY_US.paragraphs.map((p, i) => (
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

          <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
            {WHY_US.values.map((v, i) => (
              <motion.li
                key={v.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-lg text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-espresso">
                    {v.title}
                  </h3>
                </div>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-espresso/65">
                  {v.body}
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12">
            <MagneticButton target={WHY_US.cta.target} variant="solid">
              {WHY_US.cta.label}
            </MagneticButton>
          </div>
        </div>

        {/* Auto-looping facility catalog — stretches to match copy column height */}
        <div className="relative flex flex-col lg:col-span-5 lg:sticky lg:top-28 lg:h-full">
          <CatalogLoop
            slides={WHY_US_CATALOG}
            label="Mill Facility Catalog"
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
}
