import { Locale } from "@/types/portfolio";
import navigation from "@/content/navigation.config.json";
import home from "@/content/pages/home.config.json";
import studio from "@/content/pages/studio.config.json";
import products from "@/content/pages/products.config.json";
import contact from "@/content/pages/contact.config.json";
import shared from "@/content/pages/shared.config.json";
import { defaultLocale } from "./config";

const assemble = (locale: Locale) => ({ ...navigation.translations[locale], ...home[locale], ...studio[locale], ...products[locale], ...contact[locale], ...shared[locale] });
export type Dictionary = ReturnType<typeof assemble>;
export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return assemble(locale);
}
