import Image from "next/image";
import { workSamples } from "@/data/work-samples";
import { workBrand, workTitle } from "@/lib/work-media";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/types/portfolio";

/** Deliberately static: these figures have no links, buttons or media viewer. */
export function ProductStills({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return <section aria-label={dict.productsPage.allProducts} className="product-stills grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-14">
    {workSamples.map((sample, index) => <figure key={sample.id}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-raised)]">
        <Image src={sample.media.thumbnail || sample.media.poster!} alt={sample.alt[locale]} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" className="object-cover" preload={index < 3} />
      </div>
      <figcaption className="pt-4 border-b border-[var(--border)] pb-4">
        <div className="flex justify-between gap-4 text-[10px] tracking-[0.16em] uppercase text-[var(--muted)] mb-2"><span>{workBrand(sample, locale)}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
        <h2 className="text-lg sm:text-xl tracking-tight">{workTitle(sample, locale)}</h2>
      </figcaption>
    </figure>)}
  </section>;
}
