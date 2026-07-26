"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/content";
import { scrollToSection } from "@/lib/smoothScroll";

const overlay: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
  },
};

const list: Variants = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Full-screen mobile menu with a staggered link reveal. Rendered into the header;
 * open state is owned by the parent. Fully keyboard operable and labelled.
 */
export function MobileNav({
  open,
  onClose,
  activeId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
}) {
  const go = (id: string) => {
    onClose();
    // let the overlay start closing, then scroll
    setTimeout(() => scrollToSection(id), 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="grain fixed inset-0 z-40 flex flex-col bg-espresso text-cream lg:hidden"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.nav
            className="relative z-[2] mt-auto mb-auto flex flex-col gap-2 px-8"
            variants={list}
            initial="hidden"
            animate="visible"
          >
            {NAV_LINKS.map((link, i) => (
              <div key={link.id} className="overflow-hidden py-1">
                <motion.button
                  variants={item}
                  onClick={() => go(link.id)}
                  className={`flex items-baseline gap-4 font-display text-5xl tracking-tight transition-colors sm:text-6xl ${
                    activeId === link.id ? "text-gold" : "text-cream"
                  }`}
                >
                  <span className="font-sans text-xs text-gold/70">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.button>
              </div>
            ))}
          </motion.nav>

          <div className="relative z-[2] px-8 pb-10">
            <p className="eyebrow text-gold">Call us</p>
            <div className="mt-2 flex flex-col gap-1">
              {SITE.phones.map((p) => (
                <a
                  key={p}
                  href={`tel:${p.replace(/[^\d]/g, "")}`}
                  className="link-underline text-lg"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
