import { GeometricProductsHeading } from "./GeometricProductsHeading";
import { ProductHeroMotif } from "./ProductHeroMotif";
import type { Locale } from "@/types/portfolio";

export function ProductHero({ locale }: { locale: Locale }) {
  return <section className="border-b border-[var(--border)] py-9 sm:py-14 lg:py-20">
    <div className="container-popart grid lg:grid-cols-12 gap-7 items-center">
      <div className="lg:col-span-9">
        <p className="section-kicker mb-5">PopArt Agency / {locale === "fr" ? "CONCEPTS DE PRODUITS" : "PRODUCT CONCEPTS"}</p>
        <GeometricProductsHeading locale={locale} className="mb-6" />
        <p className="editorial-copy max-w-2xl">{locale === "fr" ? "Identités produits, packaging et objets. Des concepts originaux signés PopArt Agency." : "Product identities, packaging and objects. Original concepts, art-directed by PopArt Agency."}</p>
      </div>
      <div className="hidden lg:flex lg:col-span-3 justify-end"><ProductHeroMotif size={210} /></div>
    </div>
  </section>;
}
