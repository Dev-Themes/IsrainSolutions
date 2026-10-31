import type { Locale } from "@/types/portfolio";

export { default as videoOffers } from "@/content/offers.config.json";

export function formatOfferPrice(value: number, locale: Locale) {
  return `${new Intl.NumberFormat(locale === "ro" ? "ro-RO" : locale === "fr" ? "fr-FR" : "en-GB").format(value)} lei`;
}
