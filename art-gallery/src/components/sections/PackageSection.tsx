import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { videoOffers, formatOfferPrice } from "@/data/video-offers";
import type { Locale } from "@/types/portfolio";

export function PackageSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  return <section id="packages" className="packages video-offers section-space" aria-labelledby="packages-title">
    <div className="container-popart">
      <div className="package-heading"><div><p className="section-kicker mb-3">02 / {fr ? "VOS PROCHAINES PUBLICITÉS" : "YOUR NEXT PRODUCT ADS"}</p><h2 id="packages-title" className="section-title">{fr ? "Un produit. Plusieurs possibilités." : "One product. More possibilities."}</h2></div><p>{fr ? "Des films courts. Des directions créatives distinctes. Choisissez votre formule." : "Short product films. Distinct creative directions. Find your starting point."}</p></div>
      <div className="video-offer-grid">
        {videoOffers.map((offer, index) => <article className={`video-offer ${index === 1 ? "video-offer-recommended" : ""}`} key={offer.count}>
          <div className="video-offer-top"><span className="section-kicker">0{index + 1} / POPART</span><span className="video-offer-badge">{offer.badge[locale]}</span></div>
          <div className="video-offer-art" aria-hidden="true">{Array.from({ length: offer.count }, (_, i) => <span key={i} style={{ "--tile": i } as React.CSSProperties} />)}</div>
          <h3><span>{offer.count}</span> {fr ? "vidéos" : "videos"}</h3>
          <p className="video-offer-description">{offer.description[locale]}</p>
          <div className="video-offer-price"><p className="section-kicker">{fr ? "TARIF DE LANCEMENT" : "FOUNDING PRICE"}</p><div><strong>{formatOfferPrice(offer.price, locale)}</strong><del aria-label={`${fr ? "Prix initial" : "Original price"}: ${formatOfferPrice(offer.originalPrice, locale)}`}>{formatOfferPrice(offer.originalPrice, locale)}</del></div><span>{fr ? "pour la formule" : "per package"}</span></div>
          <Link href={`/${locale}/contact?offer=${offer.count}`} className="video-offer-cta">{fr ? "PARLONS DE VOS VIDÉOS" : "LET’S MAKE YOUR ADS"}<ArrowUpRight size={22} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <p className="package-note">{fr ? "Prix en lei roumains (RON). Fréquence, calendrier, livrables et conditions à convenir avant le lancement." : "Prices in Romanian lei (RON). Billing frequency, schedule, deliverables and terms agreed before the project starts."}</p>
    </div>
  </section>;
}
