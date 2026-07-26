# Saghir Sultan Companies — website

A modern, cinematic, scroll-driven rebuild of the corporate site for **Saghir Sultan
Companies**, a Sialkot family group founded in 1989 (flour milling, fuel retail,
poultry farming, and real estate).

> Tagline: _"Rooted in tradition, powered by quality."_

## Tech stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router) + TypeScript                          |
| Styling            | Tailwind CSS v4 (tokens in `app/globals.css` via `@theme`)    |
| Smooth scroll      | [Lenis](https://github.com/darkroomengineering/lenis), global |
| Scroll animation   | GSAP + ScrollTrigger (pinning, horizontal scroll, parallax)   |
| Component motion   | Framer Motion (enter animations, micro-interactions)          |
| Images             | `next/image` (priority on hero, lazy elsewhere)               |
| Split-text         | Manual word/line wrapper (`components/motion/SplitText.tsx`)  |

Lenis is driven from GSAP's single `ticker` (see
`components/providers/SmoothScrollProvider.tsx`) so ScrollTrigger and Lenis never
run two competing scroll loops.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also typechecks)
npm run start    # serve the production build
```

## Project structure

```
app/
  layout.tsx            Fonts, metadata, providers, preloader, cursor, header
  page.tsx              Section composition (the whole homepage)
  globals.css           Tailwind v4 + design tokens (@theme) + base styles
components/
  Header.tsx            Sticky/condensing header + scroll-spy
  MobileNav.tsx         Full-screen mobile overlay nav
  Preloader.tsx         0→1989 counter + clip-path curtain wipe
  motion/               Reusable motion primitives
    SplitText.tsx         Word/line mask reveal for headings
    RevealImage.tsx       Clip-path image reveal + hover zoom
    MagneticButton.tsx    Magnetic hover button / scroll trigger
    StatCounter.tsx       Count-up-on-view number
    Cursor.tsx            Custom dot + trailing ring (pointer devices only)
  providers/
    SmoothScrollProvider.tsx   Lenis ⇄ GSAP ticker wiring
  sections/             One file per page section
    Hero, Marquee, About, Companies, WhyUs, Testimonials, CTA, Footer
lib/
  content.ts            ← ALL copy, companies, testimonials, contact details
  design-tokens.ts      Colors, type scale, spacing (JS mirror of @theme)
  gsap.ts               Registers ScrollTrigger once (client)
  smoothScroll.ts       scrollToSection() helper (Lenis-aware, native fallback)
  useGsapContext.ts     Scoped GSAP setup with auto-cleanup on unmount/resize
  useReducedMotion.ts   Reactive prefers-reduced-motion hook
public/images/          Named placeholder art (see below)
```

## Where to change things

### Copy & data — `lib/content.ts`

Everything textual lives here: headlines, paragraphs, the four companies and
their product/service lists, the testimonials, phone numbers, hours, footer
columns. Edit this one file; the components read from it.

### Contact details

Phone numbers, email, hours, and location are the `SITE` object at the top of
`lib/content.ts`.

### Images — `public/images/`

All photography lives in `public/images/` and is referenced from `lib/content.ts`.

| Slot                 | File                                   |
| -------------------- | --------------------------------------- |
| Hero background      | `backgroundimage.png`                    |
| Hero building        | `SS.png`                                 |
| Flour Mills panel    | `SS.png`                                 |
| Hascol CNG panel     | `Petrolpump.png`                         |
| Poultry Farms panel  | `Poltryform.png`                         |
| Real Estate panel    | `Realestate.png`                         |
| Site logo            | `logo.png`                               |
| Marquee strip        | `SS.png`, `Petrolpump.png`, `Poltryform.png`, `Realestate.png`, plus two gallery shots |
| Why-us cluster       | `SS.png`, `Poltryform.png`, `Realestate.png` |

> To swap any image, replace the file (keep the same name) or update its path in
> `lib/content.ts` (the `IMAGES` map and each `COMPANIES[].image`).

The hero background and building are loaded with `priority`; everything else
lazy-loads.

### Design tokens

Colors, fonts, type scale, and spacing are defined as CSS custom properties in
`app/globals.css` under `@theme` (Tailwind v4). A JS-readable mirror lives in
`lib/design-tokens.ts` for use inside animation code. Change a value in both
places to keep them in sync.

Palette: espresso `#17130F`, cream `#F6F0E6`, wheat gold `#C79A3C`, amber
`#E0A836`, forest `#2F4A3A`, stone `#D8CDBB`.

## Accessibility & motion

- **`prefers-reduced-motion` is fully respected.** The preloader, Lenis smooth
  scrolling, pinning, parallax, split-text, and the custom cursor all switch off;
  content falls back to simple fades and is completely usable and readable.
- Semantic landmarks, a skip link, visible gold focus rings, keyboard-operable
  nav and testimonial carousel (arrow keys + buttons), ARIA labels on controls,
  and descriptive `alt` text on every meaningful image.
- The custom cursor only activates on fine (mouse) pointers.

## Responsiveness

Designed from 360px up. Heavy parallax is disabled on small screens, and the
pinned horizontal Companies gallery collapses into a vertical stack of cards
below the `lg` breakpoint (1024px).

## Notes

- All ScrollTrigger instances are created inside a scoped `gsap.context`
  (`useGsapContext`) and reverted on unmount, with a debounced `ScrollTrigger.refresh()`
  on resize to avoid layout thrash.
- If you change the hero image and the browser seems to cache an old version in
  development, hard-refresh (⌘/Ctrl+Shift+R) — Next's dev image optimizer caches
  aggressively by path.
