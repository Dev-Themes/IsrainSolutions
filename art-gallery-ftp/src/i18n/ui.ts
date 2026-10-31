import type { Locale } from "@/types/portfolio";
import work from "@/content/pages/work.config.json";
import sharedCopy from "@/content/pages/interface.config.json";

const copy = { ...sharedCopy, ...work.copy };

/** Copy lives in JSON; the existing arguments retain stable lookup keys. */
export function ui(locale: Locale, french: string, english: keyof typeof copy): string {
  return copy[english][locale] ?? (locale === "fr" ? french : english);
}
