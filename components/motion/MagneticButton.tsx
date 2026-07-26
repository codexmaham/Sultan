"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionStyle,
} from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { scrollToSection } from "@/lib/smoothScroll";

type Variant = "solid" | "outline" | "ghost" | "dark";

type MagneticButtonProps = {
  children: React.ReactNode;
  /** Section id to smooth-scroll to on click. */
  target?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  "aria-label"?: string;
  /** Strength of the magnetic pull (px of travel at the edge). */
  strength?: number;
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform focus-visible:outline-2 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  solid: "bg-gold text-espresso hover:bg-amber",
  dark: "bg-espresso text-cream hover:bg-forest",
  outline:
    "border border-stone/70 text-current hover:border-current hover:bg-current/5",
  ghost: "text-current hover:opacity-70",
};

/**
 * Button (or scroll trigger) that drifts toward the cursor on hover — a subtle
 * magnetic micro-interaction. Magnetism is disabled for touch pointers and for
 * reduced-motion users, where it renders as an ordinary, fully-functional button.
 */
export function MagneticButton({
  children,
  target,
  onClick,
  variant = "solid",
  className,
  strength = 14,
  ...rest
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 15, mass: 0.3 });

  const handleClick = () => {
    if (target) scrollToSection(target);
    onClick?.();
  };

  const magnetic = !reduced;

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!magnetic || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const style: MotionStyle = magnetic ? { x: springX, y: springY } : {};

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={handleClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={style}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
