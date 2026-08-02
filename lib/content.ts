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
  phones: ["+92 327 7448888", "(052) 4561870"],
  whatsapp: "+92 327 7448888", // Raiz, SS Mill
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
  heading: "Three decades of discipline and standards.",
  paragraphs: [
    "What began as a single premium flour mill in Sialkot has, over three decades, become a multi-sector group trusted across Pakistan. The founding conviction never changed: get the fundamentals right, treat people fairly, and let quality earn its own reputation.",
    "Today Saghir Sultan Companies spans milling, fuel retail, ethical poultry farming, and commercial real estate, with an international footprint through our waterproofing contracting division in New York, each run with the same family standards of care, transparency, and long-term thinking that carried us from one grinding stone to a group.",
  ],
  readMore: { label: "Read our full story", target: "companies" },
  stats: [
    { value: 94.5, suffix: "%", label: "Satisfied customers" },
    { value: 1989, suffix: "", label: "Established", isYear: true },
    { value: 5, suffix: "", label: "Divisions, one standard" },
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
  detail: {
    eyebrow: string;
    paragraphs: string[];
    highlights: { title: string; body: string }[];
    location?: string;
  };
};

export const INDUSTRIES = {
  eyebrow: "Our companies",
  heading: "Five divisions, one standard.",
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
    items: ["Atta", "Maida", "Suji", "Choker", "Fine Atta", "Super Fine Atta", "Pizza Flour"],
    accent: "gold",
    image: "/images/SS.png",
    imageAlt:
      "The Saghir Sultan Flour Mills building, a red-brick mill with the company name on its central tower.",
    detail: {
      eyebrow: "Division 01 · Flour Milling",
      paragraphs: [
        "Saghir Sultan Flour Mills is where the group began — a premium milling operation in Sialkot built around Swiss machinery, careful grain selection, and batch consistency that bakers and households have relied on for decades.",
        "Every load is checked for texture, colour, and rise before it leaves the mill. From Atta and Maida to Suji and specialty grades, our product range serves retail shelves, commercial bakeries, and institutional buyers across the region.",
        "Quality here is not a marketing line — it is the standard that every other division in the group was measured against when we expanded beyond milling.",
      ],
      highlights: [
        {
          title: "Swiss milling technology",
          body: "Precision roller mills and cyclone separation for consistent flour in every bag.",
        },
        {
          title: "Hand-selected grain",
          body: "Wheat sourced and inspected before processing to protect texture and rise.",
        },
        {
          title: "Full product range",
          body: "Atta, Maida, Suji, Choker, Fine Atta, Super Fine Atta, and Pizza Flour for every use case.",
        },
      ],
      location: "Sialkot, Pakistan",
    },
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
    detail: {
      eyebrow: "Division 02 · Fuel Retail",
      paragraphs: [
        "Hascol Sultan CNG & Filling Station keeps Sialkot moving — fleets, families, and businesses that depend on reliable fuel, every day, without excuses.",
        "Operated in partnership with Hascol Petroleum, the station combines trusted supply with service standards that reflect the wider Saghir Sultan group: clean forecourts, honest dispensing, and staff who treat every customer fairly.",
        "Whether you are filling a family car, a commercial fleet, or stocking lubricants for workshop use, this is fuel retail built for repeat business, not one-off transactions.",
      ],
      highlights: [
        {
          title: "Hascol Petroleum partnership",
          body: "Fuel supply backed by one of Pakistan's established petroleum brands.",
        },
        {
          title: "Multi-fuel forecourt",
          body: "Petrol, high-speed diesel, lubricants, and CNG under one trusted roof.",
        },
        {
          title: "Fleet-friendly service",
          body: "Reliable fills and consistent quality for commercial operators and families alike.",
        },
      ],
      location: "Sialkot, Pakistan",
    },
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
    detail: {
      eyebrow: "Division 03 · Poultry & Protein",
      paragraphs: [
        "Sultan Poultry Farms produces eggs and poultry meat with animal welfare, clean processes, and honest sourcing at the centre of every decision.",
        "Our barns are designed for ventilation, space, and health — because better conditions produce better protein and stronger long-term supply for retail and food-service partners.",
        "From egg production to meat supply, we serve customers who need consistency they can put their own brand name behind.",
      ],
      highlights: [
        {
          title: "Ethical production",
          body: "Welfare-focused barn design and monitored health standards throughout the flock.",
        },
        {
          title: "Egg & meat supply",
          body: "Reliable protein for retailers, food brands, and institutional buyers.",
        },
        {
          title: "Sustainable operations",
          body: "Cleaner processes and responsible sourcing built for long-term trust.",
        },
      ],
      location: "Sialkot, Pakistan",
    },
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
    image: "/images/Realestate.jpg",
    imageAlt:
      "A finished Sultan Real Estate residential building complex in Sialkot.",
    detail: {
      eyebrow: "Division 04 · Real Estate",
      paragraphs: [
        "Sultan Real Estate develops and manages commercial and residential property across Sialkot — well-located spaces where retail, office, and living demand meet long-term stewardship.",
        "Our portfolio includes established plazas and growing residential stock, managed with the same transparency and care that define the rest of the group.",
        "For tenants, investors, and partners, we offer property that is maintained properly, leased fairly, and positioned for steady footfall and lasting value.",
      ],
      highlights: [
        {
          title: "Commercial plazas",
          body: "Sialkot Cantt Plaza, Regment Plaza, and Adda Jhai Plaza in active retail use.",
        },
        {
          title: "Residential portfolio",
          body: "Apartments and living spaces developed with long-term occupancy in mind.",
        },
        {
          title: "Active management",
          body: "Retail and office rentals backed by responsive, transparent property management.",
        },
      ],
      location: "Sialkot, Pakistan",
    },
  },
  {
    id: "data-waterproofing",
    index: "05",
    name: "Data Waterproofing Inc",
    short: "Waterproofing",
    description:
      "The group's international presence, based at 2329 Delanoy Avenue, Bronx, New York. A specialist waterproofing contractor focused on building protection, durability, and long-term structural care, carrying the same standard of workmanship abroad as at home.",
    itemsLabel: "Services",
    items: [
      "Roof waterproofing",
      "Structural protection",
      "Building envelope care",
      "Long-term durability",
    ],
    accent: "green",
    image: "/images/waterprofing.png",
    imageAlt:
      "Waterproofing crew applying a torch-on membrane to a foundation wall and slab on a construction site.",
    detail: {
      eyebrow: "Division 05 · Waterproofing",
      paragraphs: [
        "Data Waterproofing Inc extends the group's standards internationally from 2329 Delanoy Avenue, Bronx, New York — specialist building protection for roofs, foundations, and structural envelopes.",
        "The division focuses on durability and long-term structural care: membranes, envelope protection, and workmanship that prevents costly water damage before it starts.",
        "It is the same people-first, quality-first philosophy that built the mill in Sialkot — applied to construction protection in one of the world's most demanding building markets.",
      ],
      highlights: [
        {
          title: "Roof waterproofing",
          body: "Torch-applied and membrane systems for lasting weather protection.",
        },
        {
          title: "Structural protection",
          body: "Foundation and envelope care designed to extend building life.",
        },
        {
          title: "US-based operations",
          body: "Serving New York from 2329 Delanoy Avenue, Bronx, NY.",
        },
      ],
      location: "2329 Delanoy Avenue, Bronx, New York",
    },
  },
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((company) => company.id === slug);
}

export function getCompanyHref(id: string): string {
  return `/companies/${id}`;
}

export const WHY_US = {
  eyebrow: "Why work with us",
  heading: "Legacy of Excellence",
  subheading:
    "Built to international benchmarks — Swiss-grade technology, food-safe production, and the same standard of care from Sialkot to New York.",
  paragraphs: [
    "Working with Saghir Sultan Companies means partnering with a group that has spent three decades earning trust one delivery, one fill, one lease at a time. Our name carries weight in Sialkot because we have never treated quality as negotiable.",
    "Across five very different industries, from a Sialkot flour mill to a waterproofing contractor in New York, we bring the same disciplined, people-first approach and the same standards wherever we operate.",
  ],
  standardsEyebrow: "International standards",
  standards: [
    {
      title: "Swiss Bühler Technology",
      body: "Precision roller milling and separation systems engineered to global industry benchmarks.",
    },
    {
      title: "Food-Grade Quality Control",
      body: "Batch consistency, traceable processing, and standards that protect every product we ship.",
    },
    {
      title: "Cross-Border Operations",
      body: "A Sialkot heritage with an international footprint — one group, one standard, two continents.",
    },
    {
      title: "Ethical & Sustainable Practice",
      body: "Responsible sourcing, welfare-focused production, and long-term stewardship across every division.",
    },
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
      body: "Five divisions that steady one another through any cycle.",
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
        { label: "Flour Mills", href: "/companies/flour-mills" },
        { label: "Hascol CNG & Filling", href: "/companies/hascol-cng" },
        { label: "Poultry Farms", href: "/companies/poultry-farms" },
        { label: "Real Estate", href: "/companies/real-estate" },
        { label: "Data Waterproofing", href: "/companies/data-waterproofing" },
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
    "/images/Realestate.jpg",
    "/images/pexels-tkphotos-26625882.webp",
    "/images/pexels-ag-photography-243127230-12455093.webp",
  ],
} as const;

/** Facility catalog for the Flour Mills detail page — Bühler machinery + mill infrastructure. */
export const MILL_FACILITY_CATALOG = [
  {
    src: "/images/buhler-1.jpg",
    alt: "Bühler roller mill with grain feed hopper and analogue gauges on the milling floor.",
    title: "Bühler Roller Mill",
    caption:
      "Swiss Bühler roller milling at the heart of our production — precision grinding for consistent texture, colour, and rise in every batch.",
    tag: "Bühler Machinery",
  },
  {
    src: "/images/buhler-2.jpg",
    alt: "A row of mint-green Bühler roller mills connected by overhead piping in the mill hall.",
    title: "Bühler Milling Line",
    caption:
      "Multiple Bühler units in series, fed by overhead ducting — engineered for throughput without compromising batch quality.",
    tag: "Bühler Machinery",
  },
  {
    src: "/images/buhler-3.jpg",
    alt: "Close view of a Bühler mill with digital controls, pressure gauge, and grain in the inspection window.",
    title: "Precision Controls",
    caption:
      "Digital readouts and calibrated gauges on every Bühler unit — monitored settings that protect consistency shift after shift.",
    tag: "Bühler Machinery",
  },
  {
    src: "/images/why-us-5.jpg",
    alt: "Rows of Swiss milling cyclones inside Saghir Sultan Flour Mills.",
    title: "Swiss Cyclone Bank",
    caption:
      "Rows of cyclone separators — the backbone of texture, colour, and rise in every bag we ship.",
    tag: "Swiss Machinery",
  },
  {
    src: "/images/why-us-6.jpg",
    alt: "Central roller mill surrounded by green cyclones and blue ducting.",
    title: "Central Roller Mill",
    caption:
      "The heart of the operation: roller milling surrounded by integrated separation and ducting.",
    tag: "Core Milling",
  },
  {
    src: "/images/why-us-1.jpg",
    alt: "White and teal grain separators connected by overhead piping.",
    title: "Grain Separation Line",
    caption:
      "Precision separators and teal ducting route every batch through a controlled, traceable flow.",
    tag: "Processing",
  },
  {
    src: "/images/why-us-2.jpg",
    alt: "Teal processing cabinets suspended on an overhead rail system.",
    title: "Overhead Rail System",
    caption:
      "Modular cabinets on a suspended rail — Swiss engineering built for consistency at scale.",
    tag: "Infrastructure",
  },
  {
    src: "/images/why-us-3.jpg",
    alt: "Milling line with arched windows and teal feed pipes.",
    title: "Milling Floor",
    caption:
      "A light-filled production hall where natural daylight meets spotless, monitored operations.",
    tag: "Production",
  },
  {
    src: "/images/why-us-4.jpg",
    alt: "Centrifugal blowers and cyclone separators on the mill floor.",
    title: "Cyclone & Airflow",
    caption:
      "Centrifugal blowers and green cyclones manage airflow with the reliability our flour depends on.",
    tag: "Quality Control",
  },
] as const;
