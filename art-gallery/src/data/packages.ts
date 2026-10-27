import type { Locale } from "@/types/portfolio";

// Demonstration amounts only. Change commercial pricing here after client approval.
export const packagePlans = [
  { slug: "essential", monthlyPrice: 1200 },
  { slug: "studio", monthlyPrice: 2800 },
  { slug: "full-creative", monthlyPrice: 5500 },
] as const;

export function getPackagePlan(slug: string) {
  return packagePlans.find(plan => plan.slug === slug);
}

export function formatPackagePrice(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(amount);
}
