import type { WorkSample, WorkGroup } from "@/types/work";
import clientManifest from "@/content/media.config.json";

export const workSamples: WorkSample[] = clientManifest.filter(item => item.visible).map(item => ({
  id: item.id, title: item.title.en, localizedTitle: item.title, brand: item.brand,
  localizedBrand: item.brandLabel,
  group: item.group as WorkGroup, origin: "selection", category: item.category,
  description: {
    ro: `${item.title.ro}. ${item.brandLabel.ro} — ${item.category.ro.toLocaleLowerCase("ro-RO")}. Un film din selecția noastră, prezentat în formatul său original.`,
    fr: `${item.title.fr}. ${item.brand} — ${item.category.fr.toLowerCase()}. Un film de notre sélection, présenté dans son format d'origine.`,
    en: `${item.title.en}. ${item.brand} — ${item.category.en.toLowerCase()}. A film from our selection, presented in its original format.`,
  },
  alt: { ro: `${item.brandLabel.ro} — ${item.title.ro}`, fr: `${item.brand} — ${item.title.fr}`, en: `${item.brand} — ${item.title.en}` },
  media: {
    type: "video", src: `/videos/${encodeURIComponent(item.source)}`,
    poster: `/videos/posters/${item.id}.webp?frame=${item.posterTime}`, thumbnail: `/videos/posters/${item.id}-tile.webp?frame=${"thumbnailTime" in item ? item.thumbnailTime : item.posterTime}`,
    mime: "video/mp4", duration: item.duration, width: item.width, height: item.height,
  },
  featured: item.featured, layout: item.id === "foldeat-fresh-perspective" ? "wide" : "standard",
}));
