/**
 * Small inline SVG icons used by the flour-mill header and hero. Kept as simple
 * stroked marks so they inherit `currentColor` and stay crisp at any size.
 */

type IconProps = { className?: string };

export function WheatMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 22V9" />
      <path d="M12 9c0-2 1.2-3.4 3-4-.2 2-1 3.4-3 4Z" />
      <path d="M12 9c0-2-1.2-3.4-3-4 .2 2 1 3.4 3 4Z" />
      <path d="M12 14c0-2 1.2-3.4 3-4-.2 2-1 3.4-3 4Z" />
      <path d="M12 14c0-2-1.2-3.4-3-4 .2 2 1 3.4 3 4Z" />
      <path d="M12 19c0-2 1.2-3.4 3-4-.2 2-1 3.4-3 4Z" />
      <path d="M12 19c0-2-1.2-3.4-3-4 .2 2 1 3.4 3 4Z" />
    </svg>
  );
}

export function ShieldCheck({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3Z" />
      <path d="m9.5 12 1.8 1.8L15 10" />
    </svg>
  );
}

export function PeopleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="2.6" />
      <path d="M3.5 18a5.5 5.5 0 0 1 11 0" />
      <circle cx="16.5" cy="9" r="2" />
      <path d="M15 14.5a5 5 0 0 1 5.5 3.5" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.5 14.6 9l6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6-4.3-4.2 6-.9Z" />
    </svg>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20s-7-4.35-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.65-9.5 9-9.5 9Z" />
    </svg>
  );
}

export function HandshakeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12.5 6 9l4 3-2 2" />
      <path d="M22 12.5 18 9l-4 3 2 2" />
      <path d="m8 12 2.5 2.5a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3L10.5 10" />
      <path d="m13.5 14.5 1.3 1.3a1.5 1.5 0 0 0 2.1-2.1" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 3.5 9 4l1 3.5-1.8 1.4a11 11 0 0 0 5 5L14.5 14 18 15l.5 2.5a2 2 0 0 1-2.2 2.3A15.5 15.5 0 0 1 4.2 7.7 2 2 0 0 1 6.5 3.5Z" />
    </svg>
  );
}
