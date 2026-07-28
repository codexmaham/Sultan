"use client";

import { Fragment, JSX, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SplitTextProps = {
  text: string;
  /** Heading level / element to render. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Split granularity. Words is the default; lines split on manual `\n`. */
  by?: "word" | "line";
  /** Delay before the stagger starts (seconds). */
  delay?: number;
  /** Re-animate every time it enters, or only once. */
  once?: boolean;
  /** Make each word react to hover with a lift + gold color shift. */
  interactive?: boolean;
  /**
   * Externally controlled reveal instead of the default scroll-into-view
   * trigger — pass `false` to hold the text hidden and `true` to play it,
   * e.g. gating the hero headline on the preloader finishing rather than on
   * viewport intersection (which fires immediately, invisibly, behind it).
   */
  active?: boolean;
};

const container = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: delay },
  },
});

const child: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Splits a heading into words (or manual lines) and reveals each from behind a
 * mask with a staggered upward slide. Falls back to a plain, fully-readable
 * element when the user prefers reduced motion. The whole string is exposed to
 * assistive tech via `aria-label`; the animated pieces are decorative.
 */
export function SplitText({
  text,
  as = "span",
  className,
  by = "word",
  delay = 0,
  once = true,
  interactive = false,
  active,
}: SplitTextProps) {
  const reduced = useReducedMotion();
  const parts = useMemo(
    () => (by === "line" ? text.split("\n") : text.split(" ")),
    [text, by],
  );

  const Tag = as as keyof JSX.IntrinsicElements;
  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const controlledProps =
    active === undefined
      ? { whileInView: "visible", viewport: { once, amount: 0.6 } }
      : { animate: active ? "visible" : "hidden" };

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={container(delay)}
      initial="hidden"
      {...controlledProps}
    >
      {parts.map((part, i) => (
        <Fragment key={`${part}-${i}`}>
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              overflow: "hidden",
              verticalAlign: "top",
              paddingBottom: "0.12em",
              marginBottom: "-0.12em",
            }}
          >
            <motion.span
              variants={child}
              whileHover={
                interactive
                  ? {
                      y: -8,
                      scale: 1.06,
                      color: "var(--color-gold)",
                      transition: { type: "spring", stiffness: 320, damping: 14 },
                    }
                  : undefined
              }
              style={{
                display: "inline-block",
                cursor: interactive ? "default" : undefined,
              }}
            >
              {part}
            </motion.span>
          </span>
          {by === "word" && i < parts.length - 1 ? " " : null}
          {by === "line" && i < parts.length - 1 ? <br /> : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}
