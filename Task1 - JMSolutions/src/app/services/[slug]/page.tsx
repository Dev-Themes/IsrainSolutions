import { notFound } from 'next/navigation';
import { servicePages, serviceSlugs } from '@/content/service-pages';
import { serviceDetailMetadata } from '@/lib/seo';
import { serviceDetailSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

import { ServiceDetailHero } from '@/components/sections/service-detail/ServiceDetailHero';
import { ServiceOfferGrid } from '@/components/sections/service-detail/ServiceOfferGrid';
import { WhySection } from '@/components/sections/service-detail/WhySection';
import { FaqSection } from '@/components/sections/service-detail/FaqSection';
import { RelatedServices } from '@/components/sections/service-detail/RelatedServices';

import { ReviewsSection } from '@/components/sections/home/ReviewsSection';
import { CtaBand } from '@/components/sections/home/CtaBand';
import { ServiceAreasSection } from '@/components/sections/home/ServiceAreasSection';

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = servicePages[resolvedParams.slug];
  if (!page) notFound();
  return serviceDetailMetadata(page);
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = servicePages[resolvedParams.slug];
  if (!page) notFound();

  return (
    <>
      <JsonLd data={serviceDetailSchema(page)} />
      
      <ServiceDetailHero page={page} />
      <ServiceOfferGrid page={page} />
      <WhySection page={page} />
      <FaqSection page={page} />
      <RelatedServices current={page.slug} />
    </>
  );
}
