import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { servicesSchema } from '@/lib/schema';
import { services } from '@/content/services';
import { ServicesHero } from '@/components/sections/services/ServicesHero';
import { ServiceBlock } from '@/components/sections/services/ServiceBlock';

import { servicesMetadata } from '@/lib/seo';

export const metadata: Metadata = servicesMetadata();

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema()} />
      <ServicesHero />
      
      {services.map((s, i) => (
        <ServiceBlock key={s.id} service={s} tone={i % 2 === 0 ? 'band' : 'bg-0'} index={i} />
      ))}

    </>
  );
}
