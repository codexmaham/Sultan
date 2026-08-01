"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WHY_US } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STANDARDS_TAGLINE =
  "Quality, safety, and accountability — measured against expectations that travel beyond borders.";

const AUTO_MS = 4200;

/**
 * "Why work with us" — Legacy + values on the left, animated international
 * standards panel on the right (equal-height row).
 */
export function WhyUs() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const total = WHY_US.standards.length;

  useEffect(() => {
    if (reduced || total <= 1) return;
    const t = setInterval(() => setActive((i) => (i + 1) % total), AUTO_MS);
    return () => clearInterval(t);
  }, [reduced, total]);

  return (
    <section
      id="why-us"
      className="relative bg-cream py-[var(--spacing-section)]"
    >
      <div className="container-page">
        {/* Top row — Legacy (left) + Standards panel (right) */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow text-gold">{WHY_US.eyebrow}</p>
            <SplitText
              as="h2"
              text={WHY_US.heading}
              className="mt-3 font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[0.98] tracking-tight text-espresso"
            />
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-xl text-base leading-relaxed text-espresso/70"
            >
              {WHY_US.subheading}
            </motion.p>

            <div className="mt-6 max-w-xl space-y-4">
              {WHY_US.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-sm leading-relaxed text-espresso/75 sm:text-base"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              {WHY_US.values.map((v, i) => (
                <motion.li
                  key={v.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: (i % 2) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-base text-gold">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-lg font-medium tracking-tight text-espresso">
                      {v.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 pl-7 text-sm leading-relaxed text-espresso/65">
                    {v.body}
                  </p>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <MagneticButton target={WHY_US.cta.target} variant="solid">
                {WHY_US.cta.label}
              </MagneticButton>
            </div>
          </div>

          {/* International standards — sidebar panel */}
          <motion.aside
            initial={reduced ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
            aria-label="International standards"
          >
            <div className="overflow-hidden rounded-[3px] border border-stone/70 bg-[#FBF7EF] shadow-[0_24px_64px_-32px_rgba(23,19,15,0.28)]">
              <div className="grain border-b border-cream/10 bg-pine px-5 py-5 sm:px-6">
                <p className="eyebrow text-gold">{WHY_US.standardsEyebrow}</p>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  {STANDARDS_TAGLINE}
                </p>

                {!reduced && (
                  <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-cream/10">
                    <motion.div
                      key={active}
                      className="h-full origin-left bg-gold"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                    />
                  </div>
                )}
              </div>

              <ul className="divide-y divide-stone/60">
                {WHY_US.standards.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <motion.li
                      key={item.title}
                      initial={reduced ? false : { opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.15 + i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative px-5 py-3.5 transition-colors duration-500 sm:px-6 sm:py-4 ${
                        isActive ? "bg-cream" : "bg-[#FBF7EF]/80"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {isActive && !reduced && (
                          <motion.span
                            layoutId="standards-accent"
                            className="absolute inset-y-3 left-0 w-0.5 bg-gold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                            aria-hidden="true"
                          />
                        )}
                      </AnimatePresence>

                      <div className="flex items-start gap-4">
                        <motion.span
                          animate={
                            reduced
                              ? undefined
                              : {
                                  scale: isActive ? 1.08 : 1,
                                  borderColor: isActive
                                    ? "rgba(199, 154, 60, 0.9)"
                                    : "rgba(199, 154, 60, 0.35)",
                                }
                          }
                          transition={{ duration: 0.4 }}
                          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-cream text-xs font-semibold text-gold"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.span>
                        <div>
                          <h3
                            className={`font-display text-base font-medium tracking-tight transition-colors duration-300 sm:text-lg ${
                              isActive ? "text-pine" : "text-espresso/85"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <motion.p
                            animate={
                              reduced
                                ? undefined
                                : { opacity: isActive ? 1 : 0.72 }
                            }
                            className="mt-1.5 text-sm leading-relaxed text-espresso/65"
                          >
                            {item.body}
                          </motion.p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-stone/50 px-5 py-3 sm:px-6">
                <span className="font-display text-sm tabular-nums text-espresso/45">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-espresso/25"> / </span>
                  {String(total).padStart(2, "0")}
                </span>
                <div className="flex gap-1.5" aria-hidden="true">
                  {WHY_US.standards.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === active ? "w-6 bg-gold" : "w-2 bg-stone"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
