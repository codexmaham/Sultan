"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A custom cursor: a small solid dot that tracks the pointer exactly, plus a
 * larger ring that trails behind with spring physics and grows over interactive
 * elements. Enabled only on fine (mouse) pointers and when motion is allowed —
 * touch and reduced-motion users keep the native cursor untouched.
 */
export function Cursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) {
      setEnabled(false);
      document.body.removeAttribute("data-cursor");
      return;
    }

    setEnabled(true);
    document.body.setAttribute("data-cursor", "on");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(
        !!target?.closest('a, button, [role="button"], input, [data-cursor-hover]'),
      );
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.removeAttribute("data-cursor");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-gold mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-gold mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: hovering ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </>
  );
}
