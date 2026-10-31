import type { Locale } from "./portfolio";

export type WorkGroup = "beauty" | "lifestyle" | "fashion" | "fragrance" | "motion";

export type WorkMedia =
  | { type: "video"; src: string; poster: string; thumbnail?: string; mime: string; defaultMuted?: boolean; duration: number; width: number; height: number }
  | { type: "image" | "gif"; src: string; poster: string; thumbnail?: string; width: number; height: number };

export interface WorkSample {
  id: string;
  title: string;
  localizedTitle?: Record<Locale, string>;
  brand: string;
  localizedBrand?: Record<Locale, string>;
  group?: WorkGroup;
  origin?: "concept" | "selection";
  category: Record<Locale, string>;
  description: Record<Locale, string>;
  alt: Record<Locale, string>;
  media: WorkMedia;
  featured: boolean;
  layout: "wide" | "standard";
}
