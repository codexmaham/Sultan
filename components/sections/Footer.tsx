"use client";

import { motion } from "framer-motion";
import { FOOTER, SITE } from "@/lib/content";
import { scrollToSection } from "@/lib/smoothScroll";

/**
 * Footer. Reveals on enter, mirrors the current site's structure (Company /
 * Info / Connect), surfaces phone numbers and hours, and offers a "Back to Top"
 * that smooth-scrolls via Lenis (falling back to native scroll otherwise).
 */
export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-stone/60 bg-cream pb-10 pt-[clamp(3.5rem,7vh,6rem)]"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <p className="font-display text-3xl tracking-tight text-espresso">
              Saghir Sultan
              <span className="ml-2 text-base text-gold">Companies</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-espresso/65">
              {FOOTER.blurb}
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <div>
                <p className="eyebrow text-espresso/45">Call</p>
                <div className="mt-1.5 flex flex-col gap-1">
                  {SITE.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/[^\d]/g, "")}`}
                      className="link-underline text-espresso"
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow text-espresso/45">Hours</p>
                <p className="mt-1.5 text-espresso/80">{SITE.hours}</p>
              </div>
              <div>
                <p className="eyebrow text-espresso/45">Find us</p>
                <p className="mt-1.5 text-espresso/80">{SITE.location}</p>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            {FOOTER.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="eyebrow text-espresso/45">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollToSection(link.target)}
                        className="link-underline text-sm text-espresso/80 hover:text-espresso"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-stone/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-espresso/50">
            © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}
          </p>
          <button
            onClick={() => scrollToSection("top")}
            className="link-underline inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-espresso"
          >
            Back to Top
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </motion.footer>
  );
}
