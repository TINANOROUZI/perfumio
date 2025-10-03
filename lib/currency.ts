export type Currency = "EUR" | "USD" | "GBP";

const RATES: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.85 };

export function getCurrencyFromCookie(): Currency {
  if (typeof document === "undefined") return "EUR";
  const m = document.cookie.match(/(?:^|;)\s*currency=([^;]+)/);
  const val = (m?.[1] || "").toUpperCase();
  return val === "USD" || val === "GBP" || val === "EUR" ? (val as Currency) : "EUR";
}

export function convertFromEUR(amountEUR: number, currency: Currency): number {
  return amountEUR * (RATES[currency] ?? 1);
}

export function formatPriceFromEUR(amountEUR: number, currency: Currency): string {
  const val = convertFromEUR(amountEUR, currency);
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(val);
}
