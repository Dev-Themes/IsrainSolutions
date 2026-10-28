import { ui } from "@/i18n/ui";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import type { Locale } from "@/types/portfolio";
import type { WorkSample } from "@/types/work";

export function FeaturedWorkSection({ projects, locale }: { projects: WorkSample[]; locale: Locale }) {
  const featured = projects.filter(project => project.featured).slice(0, 3);
  return <section id="featured-work" className="dark-section section-space border-b border-[var(--border)]" aria-labelledby="featured-title">
    <div className="container-popart">
      <div className="work-section-heading"><div><p className="section-kicker mb-3">01 / {ui(locale, "LE PRODUIT EN MOUVEMENT", "PRODUCTS IN MOTION")}</p><h2 id="featured-title" className="section-title">{ui(locale, "Petits films. Grand impact.", "Short films. Lasting impressions.")}</h2></div><p>{ui(locale, "Du premier regard à la dernière image. Découvrez une sélection de films qui donnent vie aux produits.", "From the first glance to the final frame. A selection of films that bring products to life.")}</p></div>
      <PortfolioGrid projects={featured} locale={locale} variant="featured" />
      <div className="work-section-bottom"><p>{projects.length} {ui(locale, "films. Autant de façons de se démarquer.", "films. More ways to stand out.")}</p><Link href={`/${locale}/work`} className="button-secondary">{ui(locale, "EXPLORER LA COLLECTION", "EXPLORE THE COLLECTION")}<ArrowUpRight size={17} /></Link></div>
    </div>
  </section>;
}
