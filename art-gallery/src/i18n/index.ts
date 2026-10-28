import { Locale } from "@/types/portfolio";
import { fr } from "./fr";
import { en } from "./en";
import { ro } from "./ro";
import { defaultLocale } from "./config";

export function getDictionary(locale: Locale = defaultLocale) {
  return { ro, en, fr }[locale];
}

export type Dictionary = typeof fr;
