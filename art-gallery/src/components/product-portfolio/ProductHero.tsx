import { getDictionary } from "@/i18n";
import { GeometricProductsHeading } from "./GeometricProductsHeading";
import { ProductHeroMotif } from "./ProductHeroMotif";
import type { Locale } from "@/types/portfolio";

export function ProductHero({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).productsPage;
  return <section className="border-b border-[var(--border)] py-9 sm:py-14 lg:py-20">
    <div className="container-popart grid lg:grid-cols-12 gap-7 items-center">
      <div className="lg:col-span-9">
        <p className="section-kicker mb-5">PopArt Agency / {copy.eyebrow}</p>
        <GeometricProductsHeading locale={locale} className="mb-6" />
        <p className="editorial-copy max-w-2xl">{copy.heroSubtext}</p>
      </div>
      <div className="hidden lg:flex lg:col-span-3 justify-end"><ProductHeroMotif size={210} /></div>
    </div>
  </section>;
}
