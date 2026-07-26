"use client";

import { useState } from "react";
import Image from "next/image";
import { COMPANIES, INDUSTRIES, type Company } from "@/lib/content";
import { useGsapContext } from "@/lib/useGsapContext";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToSection } from "@/lib/smoothScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * Pinned horizontal gallery — section heading stays fixed while panels scrub
 * sideways. Mobile: heading in-flow at top of pinned stage. Desktop: heading
 * floats over full-screen panels.
 */
export function Companies() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(1);
  const total = COMPANIES.length;

  const scope = useGsapContext((_self, el) => {
    const pinStage = el.querySelector<HTMLElement>("[data-pin-stage]");
    const track = el.querySelector<HTMLElement>("[data-track]");
    if (!pinStage || !track) return;

    const mm = gsap.matchMedia();
    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", el);

    const bindHorizontal = (useParallax: boolean) => {
      const distance = () =>
        Math.max(0, (panels.length - 1) * window.innerWidth);

      const scrollTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinStage,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + (distance() || 1),
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              total,
              Math.max(1, Math.round(self.progress * (total - 1)) + 1),
            );
            setActive(idx);

            panels.forEach((panel, i) => {
              const bits = panel.querySelectorAll<HTMLElement>("[data-panel-anim]");
              if (i + 1 <= idx) {
                gsap.set(bits, { opacity: 1, y: 0, clearProps: "transform" });
              }
            });
          },
        },
      });

      panels.forEach((panel) => {
        const img = panel.querySelector<HTMLElement>("[data-panel-img]");
        if (img && useParallax) {
          gsap.fromTo(
            img,
            { scale: 1.18, xPercent: -6 },
            {
              scale: 1,
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        const bits = panel.querySelectorAll<HTMLElement>("[data-panel-anim]");
        gsap.from(bits, {
          y: 44,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: useParallax ? "left 70%" : "left 92%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    };

    mm.add("(min-width: 1024px)", () => bindHorizontal(true));
    mm.add("(max-width: 1023px)", () => bindHorizontal(false));
  }, [total]);

  return (
    <section
      id="companies"
      ref={scope}
      className="relative bg-cream text-espresso"
      aria-label="Industries we serve"
    >
      <div
        data-pin-stage
        className={
          reduced
            ? ""
            : "relative flex h-[100dvh] flex-col lg:block lg:h-screen"
        }
      >
        {/* Heading — pinned with stage; stays visible while panels scrub */}
        <div
          data-section-header
          className={`container-page relative z-[3] shrink-0 ${
            reduced
              ? "pt-[var(--spacing-section)]"
              : "border-b border-stone/40 bg-cream pb-4 pt-2 backdrop-blur-sm lg:pointer-events-none lg:absolute lg:inset-x-0 lg:top-0 lg:border-0 lg:bg-transparent lg:pb-0 lg:pt-10 lg:backdrop-blur-none"
          }`}
        >
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="eyebrow text-gold">{INDUSTRIES.eyebrow}</p>
              <h2 className="mt-2 max-w-md font-display text-[clamp(1.35rem,5vw,2.8rem)] font-medium leading-tight tracking-tight lg:mt-3">
                {INDUSTRIES.heading}
              </h2>
            </div>
            {!reduced && (
              <div className="flex shrink-0 items-center gap-3" aria-hidden="true">
                <span className="font-display text-xl text-gold lg:text-2xl">
                  {String(active).padStart(2, "0")}
                </span>
                <span className="text-espresso/30">/</span>
                <span className="font-display text-xl text-espresso/40 lg:text-2xl">
                  {String(total).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div
          data-panels-wrap
          className={
            reduced ? "" : "relative min-h-0 flex-1 overflow-hidden lg:h-full"
          }
        >
          <div
            data-track
            className={
              reduced
                ? "flex flex-col"
                : "flex h-full w-max flex-row will-change-transform"
            }
          >
            {COMPANIES.map((company, i) => (
              <Panel
                key={company.id}
                company={company}
                n={i + 1}
                total={total}
                reduced={reduced}
              />
            ))}
          </div>

          {!reduced && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-[2] flex justify-center lg:bottom-8">
              <div className="flex gap-2" aria-hidden="true">
                {COMPANIES.map((c, i) => (
                  <span
                    key={c.id}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      active === i + 1 ? "w-10 bg-gold" : "w-4 bg-stone"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Panel({
  company,
  n,
  total,
  reduced,
}: {
  company: Company;
  n: number;
  total: number;
  reduced: boolean;
}) {
  const accentText = company.accent === "green" ? "text-forest" : "text-gold";
  const accentBadge =
    company.accent === "green" ? "bg-forest text-cream" : "bg-gold text-espresso";

  return (
    <article
      data-panel
      className={`relative flex shrink-0 flex-col ${
        reduced
          ? "w-full border-b border-stone/60 px-6 py-16 last:border-b-0 sm:px-10"
          : "h-full w-screen overflow-hidden px-6 pb-14 pt-3 sm:px-8 lg:h-full lg:w-screen lg:justify-center lg:overflow-visible lg:px-[clamp(2rem,7vw,7rem)] lg:pb-16 lg:pt-40 lg:flex-row lg:items-center lg:gap-14"
      }`}
    >
      <div className="relative mb-4 aspect-[16/10] max-h-[34dvh] w-full shrink-0 overflow-hidden rounded-[2px] bg-stone/30 lg:mb-0 lg:aspect-auto lg:h-[54vh] lg:max-h-none lg:w-[46%]">
        <div data-panel-img className="absolute inset-0 h-full w-full">
          <Image
            src={company.image}
            alt={company.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 to-transparent" />
      </div>

      <div className="min-h-0 flex-1 lg:w-[46%] lg:flex-none">
        <div data-panel-anim className="mb-3 flex items-center gap-3 lg:mb-5">
          <span
            className={`inline-flex h-7 items-center rounded-full px-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] ${accentBadge}`}
          >
            {company.short}
          </span>
        </div>

        <h3
          data-panel-anim
          className="max-w-xl font-display text-[clamp(1.35rem,4.5vw,3.2rem)] font-medium leading-[1.03] tracking-tight"
        >
          {company.name}
        </h3>

        <p
          data-panel-anim
          className="mt-3 max-w-lg text-sm leading-relaxed text-espresso/70 lg:mt-5 lg:text-base"
        >
          {company.description}
        </p>

        <div data-panel-anim className="mt-4 lg:mt-7">
          <p className="eyebrow mb-2 text-espresso/50 lg:mb-3">{company.itemsLabel}</p>
          <ul className="flex flex-wrap gap-1.5 lg:gap-2">
            {company.items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-stone px-3 py-1 text-xs text-espresso/80 lg:px-3.5 lg:py-1.5 lg:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          data-panel-anim
          onClick={() => scrollToSection("contact")}
          className={`link-underline mt-4 inline-flex items-center gap-2 text-sm font-medium lg:mt-8 ${accentText}`}
        >
          Learn More
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
