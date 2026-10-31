import { notFound } from "next/navigation";
import { productProjects, getProductBySlug, getRelatedProducts } from "@/data/product-projects";
import { isValidLocale } from "@/i18n/config";
import { constructMetadata, generateProductCreativeWorkSchema } from "@/lib/seo";
import { productTitle } from "@/lib/product-text";
import { ProductCaseStudyHero } from "@/components/product-portfolio/ProductCaseStudyHero";
import { ProductCaseStudyGallery } from "@/components/product-portfolio/ProductCaseStudyGallery";

type Props = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return productProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !isValidLocale(locale)) notFound();
  return constructMetadata({ locale, path: `products/${slug}`, title: productTitle(product, locale), description: product.summary[locale], ogImage: product.coverImage });
}
export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !isValidLocale(locale)) notFound();
  const index = productProjects.indexOf(product);
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductCreativeWorkSchema(product, locale)).replace(/</g, "\\u003c") }} />
    <ProductCaseStudyHero product={product} locale={locale} />
    <ProductCaseStudyGallery product={product} relatedProducts={getRelatedProducts(slug)} nextProduct={productProjects[(index + 1) % productProjects.length]} prevProduct={productProjects[(index - 1 + productProjects.length) % productProjects.length]} locale={locale} />
  </>;
}
