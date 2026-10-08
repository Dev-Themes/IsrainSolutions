import { servicePages } from '@/content/service-pages';
import { serviceDetailMetadata } from '@/lib/seo';
import { serviceDetailSchema } from '@/lib/schema';
import { JsonLd } from '@/components/seo/JsonLd';

import { ServiceDetailHero } from '@/components/sections/service-detail/ServiceDetailHero';
import { ServiceOfferGrid } from '@/components/sections/service-detail/ServiceOfferGrid';
import { WhySection } from '@/components/sections/service-detail/WhySection';
import { FaqSection } from '@/components/sections/service-detail/FaqSection';
import { RelatedServices } from '@/components/sections/service-detail/RelatedServices';

const slug = 'residential';

export function generateMetadata() {
  const page = servicePages[slug];
  return serviceDetailMetadata(page);
}

export default function ResidentialPage() {
  const page = servicePages[slug];

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
