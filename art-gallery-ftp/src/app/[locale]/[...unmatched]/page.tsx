import { notFound } from "next/navigation";
import { productProjects } from "@/data/product-projects";
import { isValidLocale } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";
import { StaticRedirect } from "@/components/routing/StaticRedirect";

type Props = { params: Promise<{ locale: string; unmatched: string[] }> };
export const dynamicParams = false;
// Export only the former rewrite aliases. All unknown URLs use the static 404.
export function generateStaticParams() {
  return [{ unmatched: ["portfolio"] }, ...productProjects.map(({ slug }) => ({ unmatched: ["portfolio", slug] }))];
}
export async function generateMetadata({ params }: Props) {
  const { locale, unmatched } = await params;
  if (!isValidLocale(locale)) notFound();
  return { ...constructMetadata({ locale, path: ["products", ...unmatched.slice(1)].join("/") }), robots: { index: false, follow: true } };
}
export default async function UnmatchedPage({ params }: Props) {
  const { locale, unmatched } = await params;
  if (!isValidLocale(locale) || unmatched[0] !== "portfolio" || unmatched.length > 2 || (unmatched[1] && !productProjects.some(p => p.slug === unmatched[1]))) notFound();
  return <StaticRedirect href={`/${locale}/products/${unmatched.slice(1).join("/")}${unmatched.length > 1 ? "/" : ""}`} />;
}
