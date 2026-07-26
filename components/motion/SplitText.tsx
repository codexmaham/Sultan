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

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={container(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
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
            <motion.span variants={child} style={{ display: "inline-block" }}>
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
