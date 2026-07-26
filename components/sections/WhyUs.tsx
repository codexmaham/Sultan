"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WHY_US, IMAGES } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useGsapContext } from "@/lib/useGsapContext";
import { gsap } from "@/lib/gsap";

/**
 * "Why work with us" — copy plus a six-point value grid, beside a cluster of
 * images that drift at different rates for a layered-parallax depth effect
 * (desktop only; disabled on mobile and under reduced motion).
 */
export function WhyUs() {
  const scope = useGsapContext((_self, el) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]", el);
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallax) || 0;
        gsap.to(layer, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });
  });

  return (
    <section
      id="why-us"
      ref={scope}
      className="relative bg-cream py-[var(--spacing-section)]"
    >
      <div className="container-page grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Copy + values */}
        <div className="lg:col-span-7">
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

        {/* Image cluster with layered parallax */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto h-[520px] w-full max-w-md md:h-[640px]">
            <div
              data-parallax="-14"
              className="absolute left-0 top-6 h-56 w-40 overflow-hidden rounded-[2px] bg-stone/40 shadow-xl sm:h-72 sm:w-52"
            >
              <Image
                src={IMAGES.whyUs[0]}
                alt="A miller inspecting freshly ground flour for colour and texture."
                fill
                sizes="13rem"
                className="object-cover"
              />
            </div>
            <div
              data-parallax="10"
              className="absolute right-0 top-24 h-64 w-44 overflow-hidden rounded-[2px] bg-stone/40 shadow-xl sm:h-80 sm:w-56"
            >
              <Image
                src={IMAGES.whyUs[1]}
                alt="Well-tended poultry in a sunlit welfare-focused barn."
                fill
                sizes="14rem"
                className="object-cover"
              />
            </div>
            <div
              data-parallax="-6"
              className="absolute bottom-0 left-10 h-52 w-56 overflow-hidden rounded-[2px] bg-stone/40 shadow-xl sm:h-60 sm:w-72"
            >
              <Image
                src={IMAGES.whyUs[2]}
                alt="A modern Sultan Real Estate plaza facade at golden hour."
                fill
                sizes="18rem"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
