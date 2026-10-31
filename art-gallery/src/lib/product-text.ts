import type { Locale } from "@/types/portfolio";
import type { ProductProject } from "@/types/products";

export const productTitle = (product: ProductProject, locale: Locale) => product.localizedTitle?.[locale] ?? product.title;
export const productCategory = (product: ProductProject, locale: Locale) => product.localizedCategory?.[locale] ?? product.category;
