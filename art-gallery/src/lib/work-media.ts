import { ui } from "@/i18n/ui";
import type { Locale } from "@/types/portfolio";
import type { WorkSample, WorkMedia } from "@/types/work";

export const workTitle = (project: WorkSample, locale: Locale) => project.localizedTitle?.[locale] ?? project.title;
export const workBrand = (project: WorkSample, locale: Locale) => project.localizedBrand?.[locale] ?? project.brand;
export const workLabel = (project: WorkSample, locale: Locale) => project.origin === "selection"
  ? (ui(locale, "Film sélectionné", "Selected film"))
  : (ui(locale, "Création studio", "Studio concept"));

export function workFormat(media: WorkMedia) {
  if (media.type !== "video") return media.type.toUpperCase();
  const ratio = media.width / media.height;
  const formats = [[16 / 9, "16:9"], [9 / 16, "9:16"], [4 / 5, "4:5"], [3 / 4, "3:4"], [1, "1:1"]] as const;
  const match = formats.find(([value]) => Math.abs(value - ratio) < .025);
  return `${Math.round(media.duration)}s / ${match?.[1] ?? `${media.width}:${media.height}`}`;
}
