import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import type { Locale } from "@/types/portfolio";

export function HomeClarity({ locale }: { locale: Locale }) {
  return <section className="home-clarity" aria-label={locale === "fr" ? "Découvrir PopArt Agency" : "Discover PopArt Agency"}>
    <div className="container-popart flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <p>{locale === "fr" ? "PopArt Agency. Des identités, des images et des objets qui prennent vie." : "PopArt Agency. Identities, images and objects brought to life."}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/${locale}/work`} className="button-primary">{locale === "fr" ? "Nos projets" : "View work"}<ArrowUpRight size={16} /></Link>
        <Link href={`/${locale}/products`} className="button-secondary">{locale === "fr" ? "Nos produits" : "Explore products"}<ArrowUpRight size={16} /></Link>
        <a href="#featured-work" className="header-control" aria-label={locale === "fr" ? "Voir les projets sélectionnés" : "Scroll to selected work"}><ArrowDown size={18} /></a>
      </div>
    </div>
  </section>;
}
