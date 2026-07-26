/**
 * content.ts — single source of truth for all site copy and data.
 *
 * HOW TO EDIT:
 *  - Change any headline, paragraph, product, testimonial, or contact detail here.
 *  - Image slots reference files in /public/images (see IMAGES map at the bottom).
 *    Replace those files with real photography; keep the same filenames, or update
 *    the paths here.
 */

export const SITE = {
  name: "Saghir Sultan Companies",
  shortName: "Saghir Sultan",
  preloaderTitle: "Saghir Sultan Flour Mills",
  tagline: "Rooted in tradition, powered by quality.",
  founded: 1989,
  location: "Sialkot, Pakistan",
  satisfaction: 94.5, // % satisfied customers
  phones: ["(052) 4270278-79", "(052) 4561870"],
  hours: "Monday to Friday, 9 am to 6 pm",
  email: "info@sscompanies.net",
} as const;

export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "companies", label: "Our Products" },
  { id: "why-us", label: "Quality" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact Us" },
] as const;

export const HERO = {
  since: "Since 1989",
  headline: "Building Industries. Delivering Trust. Creating Long-Term Value.",
  subline:
    "Delivers reliable products and business solutions that help organisations operate efficiently, grow confidently and scale sustainably.",
  primaryCta: { label: "Request a Consultation", target: "contact" },
  secondaryCta: { label: "Explore Our Industries", target: "companies" },
  features: [
    { icon: "wheat", label: "100% Pure\n& Natural" },
    { icon: "shield", label: "Trusted\nQuality" },
    { icon: "people", label: "Serving Since\n1989" },
  ],
  image: "/images/SS.png",
  imageAlt:
    "The Saghir Sultan Flour Mills building, a red-brick mill with the company name on its central tower.",
  background: "/images/backgroundimage.png",
};

export const ABOUT = {
  eyebrow: "A legacy in every grain",
  year: "1989",
  heading: "Three decades of doing things properly.",
  paragraphs: [
    "What began as a single premium flour mill in Sialkot has, over three decades, become a multi-sector group trusted across Pakistan. The founding conviction never changed: get the fundamentals right, treat people fairly, and let quality earn its own reputation.",
    "Today Saghir Sultan Companies spans milling, fuel retail, ethical poultry farming, and commercial real estate, each division run with the same family standards of care, transparency, and long-term thinking that carried us from one grinding stone to a group.",
  ],
  readMore: { label: "Read our full story", target: "companies" },
  stats: [
    { value: 94.5, suffix: "%", label: "Satisfied customers" },
    { value: 1989, suffix: "", label: "Established", isYear: true },
    { value: 4, suffix: "", label: "Divisions, one standard" },
  ],
};

export type Company = {
  id: string;
  index: string;
  name: string;
  short: string;
  description: string;
  items: string[];
  itemsLabel: string;
  accent: "gold" | "green";
  image: string;
  imageAlt: string;
};

export const INDUSTRIES = {
  eyebrow: "Our companies",
  heading: "Four divisions, one standard.",
};

export const COMPANIES: Company[] = [
  {
    id: "flour-mills",
    index: "01",
    name: "Saghir Sultan Flour Mills",
    short: "Flour",
    description:
      "The mill that started it all. Swiss milling machinery and grain selected by hand produce flour with consistent texture, colour, and rise: the kind bakers and households reorder without a second thought.",
    itemsLabel: "Products",
    items: ["Atta", "Maida", "Suji", "Choker", "Fine Atta", "Super Fine Atta"],
    accent: "gold",
    image: "/images/SS.png",
    imageAlt:
      "The Saghir Sultan Flour Mills building, a red-brick mill with the company name on its central tower.",
  },
  {
    id: "hascol-cng",
    index: "02",
    name: "Hascol: Sultan CNG & Filling Station",
    short: "Fuel",
    description:
      "In partnership with Hascol Petroleum, our filling station keeps Sialkot moving: fleets, families, and businesses alike, with fuel you can trust for quality and stations run with genuine service.",
    itemsLabel: "Services",
    items: ["Petrol", "High-Speed Diesel", "Lubricants", "CNG"],
    accent: "gold",
    image: "/images/Petrolpump.png",
    imageAlt:
      "Sultan CNG and Filling Station forecourt in partnership with Hascol Petroleum, fuel pumps under a red canopy.",
  },
  {
    id: "poultry-farms",
    index: "03",
    name: "Sultan Poultry Farms",
    short: "Farms",
    description:
      "Ethical poultry, egg, and meat production built around animal welfare and sustainability. Healthier birds, cleaner processes, and honest sourcing: protein you can serve with confidence.",
    itemsLabel: "Focus",
    items: [
      "Egg production",
      "Poultry meat",
      "Animal welfare",
      "Sustainability",
    ],
    accent: "green",
    image: "/images/Poltryform.png",
    imageAlt:
      "Rows of free-roaming poultry chicks in a covered, well-ventilated barn at Sultan Poultry Farms.",
  },
  {
    id: "real-estate",
    index: "04",
    name: "Sultan Real Estate",
    short: "Real Estate",
    description:
      "Three commercial plazas and a growing residential portfolio across Sialkot. Well-located retail, office, and living space, developed and managed with the same long-term stewardship as the rest of the group.",
    itemsLabel: "Portfolio",
    items: [
      "Sialkot Cantt Plaza",
      "Regment Plaza",
      "Adda Jhai Plaza",
      "Residential apartments",
      "Retail & office rentals",
    ],
    accent: "gold",
    image: "/images/Realestate.png",
    imageAlt:
      "A Sultan Real Estate construction site in Sialkot, foundations being laid for a new development.",
  },
];

export const WHY_US = {
  eyebrow: "Why work with us",
  heading: "Legacy of Excellence",
  paragraphs: [
    "Working with Saghir Sultan Companies means partnering with a group that has spent three decades earning trust one delivery, one fill, one lease at a time. Our name carries weight in Sialkot because we have never treated quality as negotiable.",
    "Across four very different industries we bring the same disciplined, people-first approach, so whether you buy a bag of flour or lease an entire floor, you deal with the same standards and the same handshake.",
  ],
  cta: { label: "Let's Get In Touch", target: "contact" },
  values: [
    {
      title: "Decades of Experience",
      body: "Since 1989, seasoned across booms, shortages, and change.",
    },
    {
      title: "Commitment to Quality",
      body: "Swiss machinery, careful sourcing, and standards we won't bend.",
    },
    {
      title: "Multi-Sector Strength",
      body: "Four divisions that steady one another through any cycle.",
    },
    {
      title: "Community-Centric Approach",
      body: "Rooted in Sialkot, invested in the people who live here.",
    },
    {
      title: "Trusted Partnerships",
      body: "Long relationships with names like Hascol Petroleum.",
    },
    {
      title: "People-First Philosophy",
      body: "Fair to staff, fair to customers, fair to the land.",
    },
  ],
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  division: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Leasing in a Sultan plaza was the easiest business decision I've made. Transparent terms, prompt management, and foot traffic that actually shows up.",
    name: "Bilal T.",
    role: "Franchise Owner",
    division: "Sultan Real Estate",
  },
  {
    quote:
      "Their poultry farms let us promise our customers welfare and consistency without compromise. Supply we can build a brand on.",
    name: "Sara A.",
    role: "Director, Nourish Foods",
    division: "Sultan Poultry Farms",
  },
  {
    quote:
      "For a fleet, fuel quality and reliability are everything. In years of fills I've never had a bad batch or a bad experience.",
    name: "Kamran N.",
    role: "Fleet Manager",
    division: "Hascol Sultan CNG",
  },
  {
    quote:
      "Consistent flour, on time, batch after batch. For a procurement head, that predictability is worth more than any discount.",
    name: "Imran Q.",
    role: "Procurement Head",
    division: "Saghir Sultan Flour Mills",
  },
];

export const CTA = {
  eyebrow: "Let's talk business",
  heading: "Ready to explore how we can work together?",
  body: "Supply, partnership, tenancy, or trade: start a conversation with a group that keeps its word.",
  button: { label: "Let's Connect", target: "contact" },
};

export const FOOTER = {
  blurb:
    "A Sialkot family group since 1989: flour, fuel, farms, and real estate under one standard.",
  columns: [
    {
      title: "Company",
      links: [
        { label: "About", target: "about" },
        { label: "Our Companies", target: "companies" },
        { label: "Why Us", target: "why-us" },
        { label: "Voices of Trust", target: "testimonials" },
      ],
    },
    {
      title: "Info",
      links: [
        { label: "Flour Mills", target: "companies" },
        { label: "Hascol CNG & Filling", target: "companies" },
        { label: "Poultry Farms", target: "companies" },
        { label: "Real Estate", target: "companies" },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "Contact", target: "contact" },
        { label: "Phone", target: "contact" },
        { label: "Visit us in Sialkot", target: "contact" },
      ],
    },
  ],
};

/**
 * IMAGES — gallery and section photography from /public/images.
 * Replace files or update paths here; components read from this map.
 */
export const IMAGES = {
  marquee: [
    "/images/SS.png",
    "/images/Petrolpump.png",
    "/images/Poltryform.png",
    "/images/Realestate.png",
    "/images/pexels-tkphotos-26625882.webp",
    "/images/pexels-ag-photography-243127230-12455093.webp",
  ],
  whyUs: [
    "/images/SS.png",
    "/images/Poltryform.png",
    "/images/Realestate.png",
  ],
} as const;
