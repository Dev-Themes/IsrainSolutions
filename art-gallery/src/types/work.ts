import type { ProjectLocalizedText } from "./portfolio";

export type WorkGroup = "beauty" | "lifestyle" | "fashion" | "fragrance" | "motion";

export type WorkMedia =
  | { type: "video"; src: string; poster: string; thumbnail?: string; mime: string; duration: number; width: number; height: number }
  | { type: "image" | "gif"; src: string; poster: string; thumbnail?: string; width: number; height: number };

export interface WorkSample {
  id: string;
  title: string;
  localizedTitle?: ProjectLocalizedText;
  brand: string;
  group?: WorkGroup;
  origin?: "concept" | "selection";
  category: ProjectLocalizedText;
  description: ProjectLocalizedText;
  alt: ProjectLocalizedText;
  media: WorkMedia;
  featured: boolean;
  layout: "wide" | "standard";
}
