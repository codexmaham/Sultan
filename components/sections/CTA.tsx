"use client";

import { CTA as CTA_CONTENT, SITE } from "@/lib/content";
import { SplitText } from "@/components/motion/SplitText";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { toTelHref } from "@/lib/phone";

/**
 * The one warm "golden" band on an otherwise light, cream site — the "Let's talk
 * business" moment. Gold background with espresso text, a big serif headline that
 * reveals on scroll, a magnetic "Let's Connect" button, and phone numbers shown
 * prominently. This is the `contact` anchor that CTAs across the site point to.
 */
export function CTA() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gold py-[var(--spacing-section)] text-espresso"
      aria-label="Contact us"
    >
      <div className="container-page relative z-[2]">
        <p className="eyebrow text-espresso/60">{CTA_CONTENT.eyebrow}</p>

        <SplitText
          as="h2"
          text={CTA_CONTENT.heading}
          className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-tight"
        />

        <p className="mt-8 max-w-xl text-base leading-relaxed text-espresso/75 sm:text-lg">
          {CTA_CONTENT.body}
        </p>

        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:items-center sm:gap-16">
          <MagneticButton
            onClick={() => {
              window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
                "Working together with Saghir Sultan Companies",
              )}`;
            }}
            variant="dark"
            strength={20}
            aria-label={`${CTA_CONTENT.button.label}: email ${SITE.email}`}
          >
            {CTA_CONTENT.button.label}
          </MagneticButton>

          <div className="flex flex-col gap-1.5">
            <span className="eyebrow text-espresso/55">Call us directly</span>
            <a
              href={toTelHref(SITE.phones[0])}
              className="link-underline font-display text-2xl tracking-tight text-espresso sm:text-3xl"
            >
              {SITE.phones[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Oversized watermark year */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-4 select-none font-display text-[28vw] leading-none text-espresso/[0.06] sm:text-[20vw]"
      >
        {SITE.founded}
      </span>
    </section>
  );
}
