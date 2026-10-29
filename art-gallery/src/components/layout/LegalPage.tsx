import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import terms from "@/content/legal/terms.config.json";
import privacy from "@/content/legal/privacy.config.json";
import cookies from "@/content/legal/cookies.config.json";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/types/portfolio";

export const legalContent = { terms, privacy, cookies };
export type LegalKind = keyof typeof legalContent;

export function LegalPage({ locale, kind }: { locale: Locale; kind: LegalKind }) {
  const document = legalContent[kind];
  const copy = document.translations[locale];
  return <article className="w-full py-16 sm:py-24">
    <div className="container-popart max-w-4xl">
      <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[var(--muted)] hover:text-[var(--accent)] mb-10"><ArrowLeft size={16} aria-hidden="true" />{copy.back}</Link>
      <p className="section-kicker mb-5">{siteConfig.name} / {copy.label}</p>
      <h1 className="text-3xl sm:text-5xl tracking-tight mb-6">{copy.title}</h1>
      <p className="text-sm text-[var(--muted)] mb-8">{copy.updatedLabel}: <time dateTime={document.updated}>{document.updated}</time></p>
      <p className="editorial-copy mb-10">{copy.intro}</p>
      <div className="space-y-9 border-t border-[var(--border)] pt-9">
        {copy.sections.map((section, index) => <section key={index}>
          <h2 className="text-xl sm:text-2xl mb-4">{String(index + 1).padStart(2, "0")}. {section.heading}</h2>
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--muted)]">{section.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
        </section>)}
      </div>
      <div className="mt-12 pt-6 border-t border-[var(--border)] text-sm"><p className="text-[var(--muted)] mb-2">{copy.contactLabel}</p><a className="underline underline-offset-4 break-all" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></div>
    </div>
  </article>;
}
