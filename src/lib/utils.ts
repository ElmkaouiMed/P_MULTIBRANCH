import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const priceFormatters: Record<string, Intl.NumberFormat> = {};

export function formatPrice(price: number, locale: string = "en"): string {
  const localeMap: Record<string, string> = {
    en: "en-US",
    fr: "fr-FR",
    ar: "ar-AE",
  };
  const code = localeMap[locale] || "en-US";
  if (!priceFormatters[code]) {
    priceFormatters[code] = new Intl.NumberFormat(code, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return priceFormatters[code].format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function calculateTotal(
  pricePerDay: number,
  days: number,
  addonPrices: number[] = []
): number {
  const base = pricePerDay * Math.max(1, days);
  const addons = addonPrices.reduce((sum, p) => sum + p, 0);
  return base + addons;
}
