"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { HERO, NAV_LINKS, SITE } from "@/lib/content";
import { scrollToSection } from "@/lib/smoothScroll";
import { ToggleButton } from "@/components/motion/ToggleButton";
import { usePreloaderDone } from "@/lib/usePreloaderDone";
import { MobileNav } from "./MobileNav";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const logoIn: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -25 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 16 },
  },
};

const dropIn: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 220, damping: 20 },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
};

/**
 * Site header — logo, centred nav, and CTA. Scrolls with the page (not sticky).
 * Plays a lively staggered entrance the moment the preloader's zoom-through
 * finishes (or immediately under reduced motion, via usePreloaderDone).
 */
export function Header() {
  const [activeId, setActiveId] = useState<string>(NAV_LINKS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const ready = usePreloaderDone();

  // Scroll-spy for the active section.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="relative z-50 border-b border-cream/10 bg-pine py-3 text-cream lg:py-3.5">
        <motion.div
          className="container-page relative flex items-center justify-between gap-5"
          variants={stagger}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
        >
          {/* Brand */}
          <motion.button
            variants={logoIn}
            onClick={() => scrollToSection("top")}
            className="group flex items-center"
            aria-label={`${SITE.name}: back to top`}
          >
            <Image
              src="/images/logo.png"
              alt={`${SITE.name} crest logo`}
              width={2218}
              height={2025}
              priority
              className="h-11 w-auto drop-shadow-sm transition-transform duration-300 group-hover:-rotate-3 sm:h-12"
            />
          </motion.button>

          {/* Desktop nav — floating glass pill, centred on the header regardless
              of how wide the logo or any side content is */}
          <motion.nav
            variants={dropIn}
            aria-label="Primary"
            className="hidden items-center gap-1 rounded-full border border-cream/15 bg-cream/10 p-1 backdrop-blur-md lg:absolute lg:left-1/2 lg:flex lg:-translate-x-1/2"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                aria-current={activeId === link.id ? "true" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.75rem] font-medium tracking-tight transition-colors duration-300 ${
                  activeId === link.id
                    ? "bg-gold text-pine"
                    : "text-cream/70 hover:bg-cream/10 hover:text-cream"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.nav>

          {/* CTA — right side of the navbar, desktop only */}
          <motion.div variants={popIn} className="hidden lg:block">
            <ToggleButton
              target={HERO.secondaryCta.target}
              variant="solid"
              hoverFill="white"
              circleColor="#F3E6C8"
              className="!h-11 !bg-[#F3E6C8] !pl-5 !text-xs hover:!bg-[#F3E6C8]"
            >
              {HERO.secondaryCta.label}
            </ToggleButton>
          </motion.div>

          {/* Mobile toggle */}
          <motion.button
            variants={popIn}
            className="relative z-50 flex h-9 w-9 items-center justify-center text-cream lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                }`}
              />
            </span>
          </motion.button>
        </motion.div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
