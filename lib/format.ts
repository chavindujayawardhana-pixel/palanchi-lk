/** Format a number using the Sri Lankan English locale (e.g. 12,000). */
export function fmt(n: number): string {
  return new Intl.NumberFormat("en-LK").format(n);
}

/**
 * Normalizes a Sri Lankan phone number into the digits-only international
 * format wa.me links require (e.g. "0771234567" -> "94771234567"). Numbers
 * already starting with "94" or "+94" pass through without doubling up.
 */
export function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  if (digits.startsWith("94")) return digits;
  if (digits.startsWith("0")) return `94${digits.slice(1)}`;
  return digits;
}
