import type { Locale } from "@/types/portfolio";

export const videoOffers = [
  { count: 2, price: 499, originalPrice: 599, badge: { fr: "Pour commencer", en: "Entry" }, description: { fr: "Deux publicités pour un produit. Deux directions créatives.", en: "Two ads for one product. Two creative directions." } },
  { count: 3, price: 699, originalPrice: 799, badge: { fr: "Recommandé", en: "Recommended" }, description: { fr: "Trois publicités, trois directions pour mettre votre produit en scène.", en: "Three ads, three directions to show what your product does." } },
  { count: 5, price: 999, originalPrice: 1199, badge: { fr: "Meilleure offre", en: "Best value" }, description: { fr: "Cinq publicités pour un mois de contenu ou pour tester différentes approches.", en: "Five ads for a month of content or to test different creative approaches." } },
] as const;

export function formatOfferPrice(value: number, locale: Locale) {
  return `${new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-GB").format(value)} lei`;
}
