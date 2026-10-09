import { getAcContent } from '@/content/localServices/ac';
import { getAreaCtx } from '@/lib/local';
import { LocalHero } from './LocalHero';
import { DiagnosticsSplit } from './DiagnosticsSplit';
import { IssueCards } from './IssueCards';
import { SecondOpinion } from './SecondOpinion';
import { LocalProof } from './LocalProof';
import { WhyChoose } from './WhyChoose';
import { LocalCta } from './LocalCta';
import { NearbyAreas } from './NearbyAreas';
import { JsonLd } from '@/components/seo/JsonLd';
import { businessNode, serviceSchema, webPageSchema, breadcrumbSchema } from '@/lib/schema';
import { site } from '@/config/site';

export function LocalServicePage({ service, area, isHub = false }: { service: any; area: any; isHub?: boolean }) {
  const ctx = getAreaCtx(area, isHub);
  // Using AC content. Later we'd switch on service.slug for heating/refrigeration
  const content = getAcContent(ctx, isHub);
  
  const path = isHub ? `/${service.slug}` : `/${service.slug}-${area.slug}`;
  const url = `${site.url}${path}`;
  
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'AC Repair', item: '/ac-repair' }
  ];
  if (!isHub) {
    breadcrumbs.push({ name: ctx.town, item: url });
  }

  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@graph': [
          businessNode(),
          serviceSchema(ctx, url),
          breadcrumbSchema(breadcrumbs, url),
          webPageSchema(url, content.hero.title, content.hero.paragraph)
        ]
      }} />

      <LocalHero data={content.hero} isHub={isHub} />
      <DiagnosticsSplit data={content.diagnostics} />
      <IssueCards />
      {content.secondOpinion.enabled && <SecondOpinion data={content.secondOpinion} />}
      <LocalProof data={content.proof} />
      <WhyChoose data={{ whyChoose: content.whyChoose, faqs: content.faqs }} url={url} />
      <LocalCta data={content.cta} />
      <NearbyAreas currentTownSlug={area?.slug} isHub={isHub} metro={ctx.metro} />
    </>
  );
}
