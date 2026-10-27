import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { packagePlans, getPackagePlan, formatPackagePrice } from "@/data/packages";
import { getDictionary } from "@/i18n";
import { isValidLocale, locales } from "@/i18n/config";
import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap(locale => packagePlans.map(plan => ({ locale, slug: plan.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const item = getDictionary(locale).packages.items.find(item => item.slug === slug);
  if (!item || !getPackagePlan(slug)) notFound();
  return constructMetadata({ locale, path: `packages/${slug}`, title: `${item.name} — ${locale === "fr" ? "Abonnement créatif" : "Creative subscription"}`, description: item.summary });
}

export default async function PackagePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();
  const copy = getDictionary(locale).packages;
  const plan = getPackagePlan(slug);
  const item = copy.items.find(item => item.slug === slug);
  if (!plan || !item) notFound();
  const number = packagePlans.findIndex(plan => plan.slug === slug) + 1;
  const emailSubject = encodeURIComponent(`PopArt Agency / ${item.name} / ${locale === "fr" ? "Demande de renseignements" : "Package enquiry"}`);

  return <article className={`package-detail package-detail-${slug}`}>
    <header className="plan-intro section-space">
      <div className="container-popart">
        <Link href={`/${locale}#packages`} className="plan-back"><ArrowLeft size={15} aria-hidden="true" />{copy.back}</Link>
        <div className="plan-intro-grid">
          <div>
            <p className="section-kicker">0{number} / {copy.detailLabel}</p>
            <h1>{item.name}</h1>
            <p className="plan-summary">{item.summary}</p>
          </div>
          <aside className="plan-estimate" aria-label={copy.priceLabel}>
            <span className="plan-draft-label">{copy.draftLabel}</span>
            <p className="plan-amount">{formatPackagePrice(plan.monthlyPrice, locale)}<span>{copy.perMonth}</span></p>
            <p className="plan-price-note">{copy.disclaimer}</p>
            <Link href={`/${locale}/contact`} className="plan-contact-link">{copy.contactLabel}<ArrowUpRight size={20} aria-hidden="true" /></Link>
          </aside>
        </div>
      </div>
    </header>

    <div className="container-popart">
      <section className="plan-fit" aria-labelledby="plan-audience">
        <div><h2 id="plan-audience" className="section-kicker">{copy.audienceLabel}</h2><p>{item.audience}</p></div>
        <div><h2 className="section-kicker">{copy.capacityLabel}</h2><p>{item.capacity}</p><p className="plan-fine-print">{copy.assetNote}</p></div>
      </section>
      <section className="plan-section" aria-labelledby="plan-included">
        <div className="plan-section-heading"><span className="section-kicker">01</span><h2 id="plan-included">{copy.includedLabel}</h2></div>
        <div className="plan-deliverables">{item.deliverables.map((deliverable, i) => <div className="plan-deliverable" key={deliverable.title}>
          <span className="section-kicker">0{i + 1}</span><h3>{deliverable.title}</h3><p>{deliverable.description}</p>
        </div>)}</div>
      </section>
      <section className="plan-section" aria-labelledby="plan-workflow">
        <div className="plan-section-heading"><span className="section-kicker">02</span><h2 id="plan-workflow">{copy.workflowLabel}</h2></div>
        <ol className="plan-workflow">{item.workflow.map((step, i) => <li key={step.title}><span className="plan-step-number">0{i + 1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </section>
      <section className="plan-section" aria-labelledby="plan-timing">
        <div className="plan-section-heading"><span className="section-kicker">03</span><h2 id="plan-timing">{copy.timingLabel}</h2></div>
        <dl className="plan-practical">
          <div><dt>{copy.deliveryLabel}</dt><dd>{item.timing}</dd></div>
          <div><dt>{copy.supportLabel}</dt><dd>{item.support}</dd></div>
          <div><dt>{copy.exclusionsLabel}</dt><dd>{item.exclusions}</dd></div>
        </dl>
      </section>
      <section className="plan-terms" aria-labelledby="plan-terms-title"><h2 id="plan-terms-title">{copy.termsLabel}</h2><p>{copy.termsBody}</p><p className="plan-fine-print">{copy.scopeNote}</p>
        <a href={`mailto:${siteConfig.email}?subject=${emailSubject}`} className="editorial-link">{copy.emailLabel}<ArrowUpRight size={18} aria-hidden="true" /></a>
      </section>
      <nav className="plan-related" aria-label={copy.otherLabel}><h2>{copy.otherLabel}</h2><div>{copy.items.filter(other => other.slug !== slug).map(other => <Link key={other.slug} href={`/${locale}/packages/${other.slug}`}><span>{other.name}</span><ArrowUpRight size={22} aria-hidden="true" /></Link>)}</div></nav>
    </div>
  </article>;
}
