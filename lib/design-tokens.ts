/**
 * design-tokens.ts — the design system as data.
 *
 * These are the same values expressed as CSS custom properties in app/globals.css
 * (@theme). Import from here when you need a token inside JS/TS (GSAP colors,
 * inline styles, canvas, etc.). Keep the two in sync when you change a value.
 */

export const colors = {
  espresso: "#17130F", // base / near-black text
  cream: "#F6F0E6", // warm paper background
  gold: "#C79A3C", // wheat gold — primary accent
  amber: "#E0A836", // amber highlight
  forest: "#2F4A3A", // deep forest green — agriculture accent
  stone: "#D8CDBB", // muted stone / borders
  pine: "#122820", // deep premium green — primary dark surface (official catalogue)
  pineLight: "#1E4534", // lighter green for gradients
} as const;

/** Modular type scale (1.25 major-third), in rem. */
export const typeScale = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "1.563rem",
  "2xl": "1.953rem",
  "3xl": "2.441rem",
  "4xl": "3.052rem",
  "5xl": "3.815rem",
  "6xl": "4.768rem",
  "7xl": "5.96rem",
  display: "clamp(3rem, 9vw, 8rem)",
} as const;

/** Spacing scale (rem) — a calm 8pt-ish rhythm with a few large section steps. */
export const spacing = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2.5rem",
  "2xl": "4rem",
  "3xl": "6rem",
  "4xl": "9rem",
  section: "clamp(5rem, 12vh, 11rem)",
} as const;

export const layout = {
  maxWidth: "1440px",
  gutter: "clamp(1.25rem, 5vw, 4rem)",
  columns: 12,
} as const;

/** Shared motion timings so every section feels part of one language. */
export const motion = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number], // "expo-out"-ish
  easeCss: "cubic-bezier(0.22, 1, 0.36, 1)",
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  stagger: 0.08,
} as const;
