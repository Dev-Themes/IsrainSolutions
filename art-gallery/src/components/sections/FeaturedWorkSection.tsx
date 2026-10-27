import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { Locale } from "@/types/portfolio";
import type { WorkSample } from "@/types/work";

export function FeaturedWorkSection({ projects, locale }: { projects: WorkSample[]; locale: Locale }) {
  const featured = projects.filter(project => project.featured).slice(0, 3);
  return <section id="featured-work" className="dark-section section-space border-b border-[var(--border)]" aria-labelledby="featured-title">
    <div className="container-popart">
      <div className="work-section-heading"><div><p className="section-kicker mb-3">01 / {locale === "fr" ? "LE PRODUIT EN MOUVEMENT" : "PRODUCTS IN MOTION"}</p><h2 id="featured-title" className="section-title">{locale === "fr" ? "Petits films. Grand impact." : "Short films. Lasting impressions."}</h2></div><p>{locale === "fr" ? "Trois produits. Trois univers. Cliquez pour découvrir nos films conceptuels." : "Three products. Three worlds. Press play on our original concept ads."}</p></div>
      <PortfolioGrid projects={featured} locale={locale} />
      <div className="work-section-bottom"><p>{locale === "fr" ? "Créations originales / PopArt Agency" : "Original creative / PopArt Agency"}</p><Link href={`/${locale}/work`} className="button-secondary">{locale === "fr" ? "TOUS LES FILMS" : "ALL FILMS"}<ArrowUpRight size={17} /></Link></div>
    </div>
  </section>;
}
