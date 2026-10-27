import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductGallery } from "@/components/product-portfolio/ProductGallery";
import { productProjects } from "@/data/product-projects";
import type { Locale } from "@/types/portfolio";

export function HomeProductsSection({ locale }: { locale: Locale }) {
  const products = productProjects.filter(product => ["noir-edition", "soniq-lab"].includes(product.slug)).map(product => ({ ...product, layout: "standard" as const }));
  return <section className="section-space bg-[var(--surface)] border-b border-[var(--border)]">
    <div className="container-popart">
      <div className="flex flex-wrap items-end justify-between gap-5 mb-10">
        <div><p className="section-kicker mb-3">PopArt Agency / {locale === "fr" ? "ÉTUDES PRODUITS" : "PRODUCT STUDIES"}</p><h2 className="section-title">{locale === "fr" ? "Une autre forme d’expression." : "A different form of expression."}</h2></div>
        <p className="editorial-copy !text-base max-w-sm">{locale === "fr" ? "Packaging, objets et images. Notre collection de concepts de produits." : "Packaging, objects and images. Explore our collection of original product concepts."}</p>
      </div>
      <ProductGallery products={products} locale={locale} showFilters={false} />
      <Link href={`/${locale}/products`} className="button-secondary mt-8">{locale === "fr" ? "Tous les produits" : "Explore all products"}<ArrowUpRight size={16} /></Link>
    </div>
  </section>;
}
