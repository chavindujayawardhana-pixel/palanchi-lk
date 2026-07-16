/** Format a number using the Sri Lankan English locale (e.g. 12,000). */
export function fmt(n: number): string {
  return new Intl.NumberFormat("en-LK").format(n);
}
