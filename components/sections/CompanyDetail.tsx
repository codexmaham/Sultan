"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Company } from "@/lib/content";
import { COMPANIES, MILL_FACILITY_CATALOG } from "@/lib/content";
import { MillIntroReel } from "@/components/motion/MillIntroReel";
import { CatalogLoop } from "@/components/motion/CatalogLoop";

export function CompanyDetail({ company }: { company: Company }) {
  const accentBadge =
    company.accent === "green" ? "bg-pine text-cream" : "bg-gold text-espresso";
  const accentText = company.accent === "green" ? "text-pine" : "text-gold";

  return (
    <article className="bg-cream text-espresso">
      {/* Welcome reel — Flour Mills only: a grain of wheat morphing into flour */}
      {company.id === "flour-mills" && <MillIntroReel />}

      {/* Hero */}
      <section className="relative overflow-hidden bg-pine text-cream">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div>
            <Link
              href="/#companies"
              className="link-underline inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream"
            >
              <span aria-hidden="true">←</span>
              All Companies
            </Link>

            <p className="eyebrow mt-8 text-gold">{company.detail.eyebrow}</p>
            <span
              className={`mt-4 inline-flex h-7 items-center rounded-full px-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] ${accentBadge}`}
            >
              {company.short}
            </span>
            <h1 className="mt-5 max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.02] tracking-tight">
              {company.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75">
              {company.description}
            </p>
            {company.detail.location && (
              <p className="mt-4 text-sm text-cream/55">{company.detail.location}</p>
            )}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px] bg-pine-light/50 lg:aspect-[5/4]">
            <Image
              src={company.image}
              alt={company.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine/35 to-transparent" />
          </div>
        </div>
      </section>

      {/* Body copy */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium tracking-tight text-pine">
              About this division
            </h2>
            <div className="mt-6 space-y-5">
              {company.detail.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={paragraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="text-base leading-relaxed text-espresso/75"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="eyebrow text-espresso/45">{company.itemsLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {company.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-stone px-3.5 py-1.5 text-sm text-espresso/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mill facility catalog — Flour Mills only */}
      {company.id === "flour-mills" && (
        <section className="border-y border-stone/60 bg-[#FBF7EF] py-[var(--spacing-section)]">
          <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10">
            <div className="flex flex-col justify-center lg:col-span-4">
              <p className="eyebrow text-gold">Inside the mill</p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight tracking-tight text-pine">
                Swiss Bühler machinery &amp; facility
              </h2>
              <p className="mt-4 text-base leading-relaxed text-espresso/70">
                From Bühler roller mills to cyclone separation and overhead
                processing lines — explore the infrastructure behind every bag of
                flour we ship.
              </p>
            </div>
            <div className="lg:col-span-8">
              <CatalogLoop
                slides={MILL_FACILITY_CATALOG}
                label="Mill Facility Catalog"
                className="h-full min-h-[520px]"
              />
            </div>
          </div>
        </section>
      )}

      {/* Highlights */}
      <section className="border-y border-stone/60 bg-[#FBF7EF] py-[var(--spacing-section)]">
        <div className="container-page">
          <p className="eyebrow text-gold">What we deliver</p>
          <h2 className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium tracking-tight text-pine">
            Built on the same standard as the rest of the group
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {company.detail.highlights.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="rounded-[2px] border border-stone/70 bg-cream p-6"
              >
                <h3 className={`font-display text-xl font-medium ${accentText}`}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-espresso/70">
                  {item.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Other divisions + CTA */}
      <section className="py-[var(--spacing-section)]">
        <div className="container-page">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-gold">Work with us</p>
              <h2 className="mt-3 max-w-xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium tracking-tight text-pine">
                Ready to discuss {company.short.toLowerCase()}?
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-espresso/70">
                Supply, partnership, tenancy, or trade — start a conversation with
                a division that keeps its word.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex h-[52px] items-center rounded-full bg-gold px-7 text-sm font-medium tracking-wide text-espresso transition-colors hover:bg-amber"
            >
              Request a Consultation
            </Link>
          </div>

          <div className="mt-16 border-t border-stone/60 pt-10">
            <p className="eyebrow text-espresso/45">Explore other divisions</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {COMPANIES.filter((entry) => entry.id !== company.id).map((entry) => (
                <li key={entry.id}>
                  <Link
                    href={`/companies/${entry.id}`}
                    className="rounded-full border border-stone px-4 py-2 text-sm text-espresso/80 transition-colors hover:border-gold hover:text-espresso"
                  >
                    {entry.short}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </article>
  );
}
