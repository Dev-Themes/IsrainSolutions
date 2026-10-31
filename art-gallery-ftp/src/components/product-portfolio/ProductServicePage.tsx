import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Clapperboard, LayoutPanelTop, Music2, Play, RotateCcw, ShieldCheck } from "lucide-react";
import type { Locale } from "@/types/portfolio";
import copy from "@/content/pages/product-service.config.json";
import { PackageSection } from "@/components/sections/PackageSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { workSamples } from "@/data/work-samples";
import styles from "./ProductServicePage.module.css";
import { ProductServicePreview } from "./ProductServicePreview";

const icons = [Clapperboard, LayoutPanelTop, Music2, Play, RotateCcw, ShieldCheck];

export function ProductServicePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const film = workSamples.find(sample => sample.id === "ricinus-hair-ritual")!;
  const selected = ["ricinus-hair-ritual", "tmb-everyday-bottle", "mos-soft-focus", "foldeat-fresh-perspective", "beauty-gloss-closeup"].flatMap(id => {
    const sample = workSamples.find(item => item.id === id);
    return sample ? [sample] : [];
  });
  return <div className={styles.page}>
    <section className={`${styles.section} ${styles.hero}`}>
      <div className={`container-popart ${styles.heroGrid}`}>
        <div>
          <p className={styles.label}>{t.eyebrow}</p>
          <h1>{t.title} <em>{t.titleEm}</em></h1>
          <p className={styles.lead}>{t.intro}</p>
          <div className={styles.actions}>
            <a className={styles.button} href="#packages">{t.packages}<ArrowDown size={18} /></a>
            <Link className={`${styles.button} ${styles.outline}`} href={`/${locale}/contact/`}>{t.enquire}<ArrowUpRight size={18} /></Link>
          </div>
          <ul className={styles.facts}>{t.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        </div>
        <div className={styles.phoneWrap}>
          <span className={styles.sticker}>{t.heroLabel}</span>
          <div className={styles.phone}>
            <ProductServicePreview src={film.media.src} poster={film.media.poster} label={t.play} />
          </div>
        </div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.process}`}>
      <div className="container-popart">
        <div className={styles.sectionHead}><p className={styles.label}>{t.processLabel}</p><h2>{t.processTitle} <em>{t.processEm}</em></h2><p className={styles.lead}>{t.processIntro}</p></div>
        <div className={styles.frames}>
          {[0, 1, 2].map(index => <figure key={index}>
            {index === 1 ? <div className={styles.storyboard} aria-label={t.frames[index]}>
              {["product", "detail", "final"].map((frame, frameIndex) => <div key={frame}><Image src={`/images/product-service/ricinus-${frame}.webp`} width={720} height={1280} alt="" /><span>0{frameIndex + 1}</span></div>)}
            </div> : <Image className={styles.processImage} src={`/images/product-service/ricinus-${index === 0 ? "product" : "final"}.webp`} width={720} height={1280} alt={t.frames[index]} />}
            <figcaption><strong>{t.frames[index]}</strong><span>{t.frameNotes[index]}</span></figcaption>
          </figure>)}
        </div>
      </div>
    </section>

    <PackageSection locale={locale} />

    <section className={styles.section}>
      <div className="container-popart">
        <div className={styles.sectionHead}><p className={styles.label}>{t.includedLabel}</p><h2>{t.includedTitle} <em>{t.includedEm}</em></h2></div>
        <div className={styles.inclusions}>{t.included.map(([title, text], index) => {
          const Icon = icons[index];
          return <div key={title}><Icon size={32} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>;
        })}</div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.noTop}`}>
      <div className="container-popart">
        <div className={styles.sectionHead}><p className={styles.label}>{t.stepsLabel}</p><h2>{t.stepsTitle} <em>{t.stepsEm}</em></h2></div>
        <ol className={styles.steps}>{t.steps.map(([title, text, when], index) => <li key={title}><span className={styles.stepNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p><span className={styles.when}>{when}</span></li>)}</ol>
      </div>
    </section>

    <section className={`${styles.section} ${styles.noTop}`} id="product-films">
      <div className="container-popart">
        <div className={`${styles.sectionHead} ${styles.reelHead}`}><div><p className={styles.label}>{t.workLabel}</p><h2>{t.workTitle} <em>{t.workEm}</em></h2></div><Link className={`${styles.button} ${styles.outline}`} href={`/${locale}/work/`}>{t.allWork}<ArrowUpRight size={18} /></Link></div>
        <div className={styles.reel}><PortfolioGrid projects={selected} locale={locale} /></div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.noTop}`}>
      <div className={`container-popart ${styles.faqGrid}`}>
        <div className={styles.sectionHead}><p className={styles.label}>{t.faqLabel}</p><h2>{t.faqTitle} <em>{t.faqEm}</em></h2></div>
        <div className={styles.faq}>{t.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>

    <section className={`${styles.section} ${styles.order}`} id="product-enquiry">
      <div className={`container-popart ${styles.orderGrid}`}>
        <div><p className={styles.label}>{t.orderLabel}</p><h2>{t.orderTitle} <em>{t.orderEm}</em></h2></div>
        <div><p className={styles.lead}>{t.orderIntro}</p><Link className={styles.button} href={`/${locale}/contact/`}>{t.orderCta}<ArrowUpRight size={18} /></Link></div>
      </div>
    </section>
    <ContactSection locale={locale} />
  </div>;
}
