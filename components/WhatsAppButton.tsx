"use client";

import { SITE } from "@/lib/content";

/** Floating WhatsApp chat bubble, present on every page above all content. */
export function WhatsAppButton() {
  const digits = SITE.whatsapp.replace(/[^\d]/g, "");
  const href = `https://wa.me/${digits}?text=${encodeURIComponent(
    "Hi! I'd like to know more about Saghir Sultan Companies.",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp: ${SITE.whatsapp}`}
      className="group fixed bottom-5 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 sm:bottom-7 sm:right-7"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 text-white"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.45 1.34 4.95L2 22l5.29-1.39a9.87 9.87 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.95-.3-1.63-.6-2.87-1.24-4.74-4.14-4.88-4.33-.14-.19-1.17-1.55-1.17-2.96s.73-2.1.99-2.39c.26-.28.56-.35.75-.35s.38 0 .55.01c.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.61-.07.16-.19.7-.81.89-1.09.19-.28.37-.23.63-.14.26.09 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
      </svg>
    </a>
  );
}
