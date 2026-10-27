import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";
import { videoOffers, formatOfferPrice } from "@/data/video-offers";
import { workSamples } from "@/data/work-samples";
import type { Locale } from "@/types/portfolio";

export function PackageSection({ locale }: { locale: Locale }) {
  const fr = locale === "fr";
  const names = fr ? ["PREMIÈRE PRISE", "LA SIGNATURE", "LE GRAND JEU"] : ["THE FIRST TAKE", "THE SIGNATURE", "THE FULL PICTURE"];
  const previews = ["mos-soft-focus", "typology-roseglow", "tmb-everyday-bottle", "loewe-pistachio", "foldeat-fresh-perspective"].map(id => {
    const sample = workSamples.find(sample => sample.id === id)!;
    return sample.media.thumbnail ?? sample.media.poster;
  });
  return <section id="packages" className="premium-offers video-offers section-space" aria-labelledby="packages-title">
    <svg className="premium-offer-orbit" viewBox="0 0 320 320" fill="none" aria-hidden="true"><circle cx="160" cy="160" r="150" /><circle cx="160" cy="160" r="110" /><circle cx="160" cy="160" r="70" /><path d="M0 160H320M160 0V320M47 47L273 273M47 273L273 47" /></svg>
    <div className="container-popart">
      <div className="premium-offer-eyebrow"><p>02 / {fr ? "L'ÉDITION CRÉATIVE" : "THE CREATIVE EDIT"}</p><span><i />{fr ? "OFFRES DE LANCEMENT" : "FOUNDING OFFERS"}</span></div>
      <div className="premium-offer-heading"><h2 id="packages-title"><span>{fr ? "Attirez" : "Make them"}</span><em>{fr ? "tous les regards." : "look twice."}</em></h2><div><Sparkles size={28} strokeWidth={1.2} aria-hidden="true" /><p>{fr ? "Votre produit mérite mieux qu'un simple défilement." : "Your product deserves more than a scroll."}</p><span>{fr ? "Deux, trois ou cinq vidéos. Des idées distinctes. Une impression qui reste." : "Two, three or five videos. Distinct ideas. One lasting impression."}</span></div></div>
      <div className="video-offer-grid">
        {videoOffers.map((offer, index) => <article className={`video-offer premium-offer-card ${index === 1 ? "premium-offer-signature" : ""}`} key={offer.count}>
          <div className="premium-card-top"><p>0{index + 1} / {names[index]}</p><span>{index === 1 && <Sparkles size={12} aria-hidden="true" />}{offer.badge[locale]}</span></div>
          <div className="premium-film-art" aria-hidden="true"><span className="premium-film-count">0{offer.count}</span><div className="premium-film-stack">{Array.from({ length: offer.count }, (_, frame) => <span className="premium-film-frame" key={frame} style={{ "--frame": frame, "--frames": offer.count } as React.CSSProperties}><Image src={previews[(index + frame) % previews.length]} alt="" fill sizes="110px" quality={80} loading="eager" /><i>0{frame + 1}</i></span>)}</div><span className="premium-film-caption">POPART / {fr ? "FILMS PRODUIT" : "PRODUCT FILMS"}</span></div>
          <h3>{offer.count}<span>{fr ? "vidéos" : "videos"}</span></h3>
          <p className="premium-card-description">{offer.description[locale]}</p>
          <div className="premium-card-inclusion"><Check size={14} aria-hidden="true" /><span>{fr ? "Des directions créatives distinctes" : "Distinct creative directions"}</span></div>
          <div className="video-offer-price"><div className="premium-price-label"><span>{fr ? "TARIF DE LANCEMENT" : "FOUNDING PRICE"}</span><span>{fr ? "−" : "SAVE "}{formatOfferPrice(offer.originalPrice - offer.price, locale)}</span></div><div className="premium-price-main"><strong>{new Intl.NumberFormat(fr ? "fr-FR" : "en-GB").format(offer.price)}<small>lei</small></strong><del aria-label={`${fr ? "Prix initial" : "Original price"}: ${formatOfferPrice(offer.originalPrice, locale)}`}>{formatOfferPrice(offer.originalPrice, locale)}</del></div><p>{fr ? "pour la formule" : "per package"}</p><span className="premium-price-per-film">{new Intl.NumberFormat(fr ? "fr-FR" : "en-GB", { maximumFractionDigits: 2 }).format(offer.price / offer.count)} lei / {fr ? "vidéo" : "video"}</span></div>
          <Link href={`/${locale}/contact?offer=${offer.count}`} className="premium-offer-cta"><span>{fr ? "CHOISIR CETTE FORMULE" : "MAKE IT HAPPEN"}</span><ArrowUpRight size={22} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <div className="premium-offer-footnote"><p>{fr ? "Un produit. Une ambition. À nous de jouer." : "One product. Big ambitions. Let’s make something."}</p><span>{fr ? "Prix en lei roumains (RON). Fréquence, calendrier, livrables et conditions à convenir avant le lancement." : "Prices in Romanian lei (RON). Billing frequency, schedule, deliverables and terms agreed before the project starts."}</span></div>
    </div>
  </section>;
}
