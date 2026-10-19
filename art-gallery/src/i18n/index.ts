import { Locale } from "@/types/portfolio";
import { fr } from "./fr";
import { en } from "./en";
import { defaultLocale } from "./config";

export function getDictionary(locale: Locale = defaultLocale) {
  return locale === "en" ? en : fr;
}

export type Dictionary = typeof fr;
