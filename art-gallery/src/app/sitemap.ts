import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { locales, defaultLocale } from "@/i18n/config";
import { legalPagesEnabled } from "@/lib/legal-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/products", "/about", "/contact",
    ...(legalPagesEnabled ? ["/privacy", "/cookies", "/terms"] : []),
  ];
  return routes.flatMap(route => locales.map(locale => ({
    url: `${siteConfig.url}/${locale}${route}`,
    changeFrequency: route === "" || route === "/work" || route === "/products" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/work" || route === "/products" ? .9 : .7,
    alternates: {
      languages: { ...Object.fromEntries(locales.map(language => [language, `${siteConfig.url}/${language}${route}`])), "x-default": `${siteConfig.url}/${defaultLocale}${route}` },
    },
  })));
}
