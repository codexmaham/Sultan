"use client";

import { scrollToSection } from "@/lib/smoothScroll";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Variant = "solid" | "outline";

type ToggleButtonProps = {
  children: React.ReactNode;
  target?: string;
  onClick?: () => void;
  variant?: Variant;
  /** Hover fill for the expanding circle — defaults to dark on solid buttons. */
  hoverFill?: "espresso" | "white";
  /** Custom fill color for the expanding circle (default + hover). */
  circleColor?: string;
  /** Disable the expand / arrow hover animation. */
  disableHover?: boolean;
  className?: string;
  "aria-label"?: string;
};

const shellByVariant: Record<Variant, string> = {
  solid: "border border-transparent bg-gold",
  outline: "border border-stone bg-cream/50",
};

function expandClasses(variant: Variant, hoverFill: "espresso" | "white") {
  if (variant === "solid" && hoverFill === "white") {
    return "bg-white group-hover:bg-white group-focus-visible:bg-white";
  }
  if (variant === "solid") {
    return "bg-white group-hover:bg-espresso group-focus-visible:bg-espresso";
  }
  return "bg-gold";
}

function labelClasses(variant: Variant, hoverFill: "espresso" | "white") {
  if (variant === "solid" && hoverFill === "white") {
    return "text-espresso";
  }
  if (variant === "solid") {
    return "text-espresso group-hover:text-cream group-focus-visible:text-cream";
  }
  return "text-espresso";
}

function arrowClasses(variant: Variant, hoverFill: "espresso" | "white") {
  if (variant === "solid" && hoverFill === "white") {
    return "text-espresso";
  }
  if (variant === "solid") {
    return "text-espresso group-hover:text-cream group-focus-visible:text-cream";
  }
  return "text-espresso";
}

const expandMotion =
  "top-1/2 right-1.5 h-9 w-9 -translate-y-1/2 group-hover:top-0 group-hover:right-0 group-hover:h-full group-hover:w-full group-hover:translate-y-0 group-focus-visible:top-0 group-focus-visible:right-0 group-focus-visible:h-full group-focus-visible:w-full group-focus-visible:translate-y-0";

/**
 * Pill CTA with a right-side circle that expands to fill the button on hover —
 * inspired by the Dribbble circle-fill button interaction.
 */
export function ToggleButton({
  children,
  target,
  onClick,
  variant = "solid",
  hoverFill = "espresso",
  circleColor,
  disableHover = false,
  className,
  ...rest
}: ToggleButtonProps) {
  const reduced = useReducedMotion();

  const handleClick = () => {
    if (target) scrollToSection(target);
    onClick?.();
  };

  const staticCircle =
    "top-1/2 right-1.5 h-9 w-9 -translate-y-1/2";

  const expandLayout = disableHover
    ? staticCircle
    : reduced
      ? "top-0 right-0 h-full w-full"
      : `transition-all duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] ${expandMotion}`;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group relative flex h-[52px] items-center overflow-hidden rounded-full py-1 pl-7 pr-1.5 text-sm font-medium tracking-wide ${shellByVariant[variant]} ${className ?? ""}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`absolute rounded-full ${
          disableHover ? "" : "transition-colors duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)]"
        } ${circleColor ? "" : expandClasses(variant, hoverFill)} ${expandLayout}`}
        style={circleColor ? { backgroundColor: circleColor } : undefined}
      />
      <span
        className={`relative z-10 whitespace-nowrap transition-colors duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] ${labelClasses(variant, hoverFill)}`}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="relative z-10 ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full max-md:ml-2 max-md:h-8 max-md:w-8"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 ${
            disableHover || reduced
              ? ""
              : "transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
          } ${arrowClasses(variant, hoverFill)}`}
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </span>
    </button>
  );
}
