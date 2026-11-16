/**
 * TradeConnect Site Configuration & Canonical Domain Resolver
 * Single source of truth for canonical URLs, metadataBase, and sitemaps.
 */

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && !envUrl.includes("localhost")) {
    return envUrl.replace(/\/+$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, "");
  }
  // Primary production domain confirmed by user
  return "https://business-platform-ashy.vercel.app";
}

export const siteConfig = {
  name: "TradeConnect",
  tagline: "Verified Local Trade Services (UK & USA)",
  description:
    "Find trusted, vetted local tradespeople across the UK and USA. Compare free quotes with verified public liability insurance for plumbing, electrical, roofing, and HVAC.",
  company: {
    legalName: "TradeConnect Network Ltd",
    registrationNumber: "14892014",
    addressUK: "124 City Road, London, EC1V 2NX, United Kingdom",
    addressUS: "701 Brazos St, Suite 1600, Austin, TX 78701, United States",
    phoneUK: "0800 123 4567",
    phoneUS: "+1 (800) 555-0199",
    email: "support@tradeconnect.com",
  },
};
