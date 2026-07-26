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
