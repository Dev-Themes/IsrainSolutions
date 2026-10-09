import type { Metadata } from 'next';
import { buildLocalMetadata } from '@/lib/seo';
import { LocalServicePage } from '@/components/sections/local/LocalServicePage';
import { services } from '@/config/services';

export function generateMetadata(): Metadata {
  const service = services.find(s => s.slug === 'ac-repair')!;
  return buildLocalMetadata(service, null, { index: true, isHub: true });
}

export default function AcRepairHubPage() {
  const service = services.find(s => s.slug === 'ac-repair')!;
  return <LocalServicePage service={service} area={null} isHub={true} />;
}
