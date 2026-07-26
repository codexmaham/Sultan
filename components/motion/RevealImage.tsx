"use client";

import Image, { type ImageProps } from "next/image";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealImageProps = Omit<ImageProps, "className"> & {
  className?: string;
  imageClassName?: string;
  /** Enable the slow zoom-on-hover. */
  hoverZoom?: boolean;
  /** Rounded corners on the mask. */
  rounded?: boolean;
};

const maskVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Image that reveals from behind a clip-path mask when it scrolls into view and
 * (optionally) scales slowly on hover. Reduced motion → a plain image, no mask,
 * no zoom. `alt` is required by next/image, so every instance is described.
 */
export function RevealImage({
  className,
  imageClassName,
  hoverZoom = true,
  rounded = true,
  ...imageProps
}: RevealImageProps) {
  const reduced = useReducedMotion();

  const wrapperClasses = [
    "relative overflow-hidden",
    rounded ? "rounded-[2px]" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const imgClasses = [
    "h-full w-full object-cover",
    !reduced && hoverZoom
      ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      : "",
    imageClassName ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  if (reduced) {
    return (
      <div className={wrapperClasses}>
        <Image {...imageProps} className={imgClasses} />
      </div>
    );
  }

  return (
    <motion.div
      className={`${wrapperClasses} group`}
      variants={maskVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Image {...imageProps} className={imgClasses} />
    </motion.div>
  );
}
