import { formatPackagePrice, getPackagePlan } from "@/data/packages";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/portfolio";

export function PackageSection({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).packages;
  return <section id="packages" className="packages section-space" aria-labelledby="packages-title">
    <div className="container-popart">
      <div className="package-heading"><div><p className="section-kicker mb-3">{copy.label}</p><h2 id="packages-title" className="section-title">{copy.heading}</h2></div><p>{copy.note}</p></div>
      <div className="package-menu">
        {copy.items.map((item, i) => <article className={`package-item package-${i}`} key={item.name}>
          <div className="package-top"><span>0{i + 1}</span>{i === 1 && <span className="package-pick"><i aria-hidden="true" />{copy.recommended}</span>}<span className="package-mark" aria-hidden="true" /></div>
          <h3>{item.name}</h3>
          <ul>{item.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <div className="package-price"><span>{copy.priceLabel}</span><p>{formatPackagePrice(getPackagePlan(item.slug)!.monthlyPrice, locale)} <small>{copy.perMonth}</small></p></div>
          <Link href={`/${locale}/packages/${item.slug}`} aria-label={`${copy.viewDetails} — ${item.name}`} className="package-cta">{copy.viewDetails}<ArrowUpRight size={22} aria-hidden="true" /></Link>
        </article>)}
      </div>
      <p className="package-note">{copy.disclaimer}</p>
    </div>
  </section>;
}
