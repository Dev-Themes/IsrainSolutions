import { Locale } from "@/types/portfolio";

export const defaultLocale: Locale = "ro";
export const locales: Locale[] = ["ro", "fr", "en"];

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
