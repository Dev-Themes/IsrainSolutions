import type { ProjectLocalizedText } from "./portfolio";

export type WorkMedia =
  | { type: "video"; src: string; poster: string; thumbnail?: string; mime: string; duration: number; width: number; height: number }
  | { type: "image" | "gif"; src: string; poster: string; thumbnail?: string; width: number; height: number };

export interface WorkSample {
  id: string;
  title: string;
  brand: string;
  category: ProjectLocalizedText;
  description: ProjectLocalizedText;
  alt: ProjectLocalizedText;
  media: WorkMedia;
  featured: boolean;
  layout: "wide" | "standard";
}
