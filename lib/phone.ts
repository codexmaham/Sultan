/** Builds a dialable `tel:` href, preserving a leading "+" for international numbers. */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}
