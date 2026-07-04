/**
 * Format a number of rupees in the Indian numbering system with the ₹ symbol,
 * e.g. 1499 -> "₹1,499", 349000 -> "₹3,49,000". No decimals (prices are whole
 * rupees in the catalogue).
 */
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
