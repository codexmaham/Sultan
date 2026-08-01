import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/Preloader";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SITE } from "@/lib/content";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sscompanies.net"),
  title: {
    default: `${SITE.name}: ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "A Sialkot family group since 1989, spanning premium flour milling, Hascol fuel retail, ethical poultry farming, and commercial real estate under one standard of quality.",
  keywords: [
    "Saghir Sultan",
    "Sultan Flour Mills",
    "Hascol Sultan CNG",
    "Sultan Poultry Farms",
    "Sultan Real Estate",
    "Sialkot",
  ],
  openGraph: {
    title: `${SITE.name}: ${SITE.tagline}`,
    description:
      "Flour, fuel, farms, and real estate: a Sialkot family group since 1989.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#17130F",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-espresso"
        >
          Skip to content
        </a>

        <Preloader />
        <Cursor />
        <SmoothScrollProvider>
          <Header />
          <main id="main">{children}</main>
        </SmoothScrollProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
