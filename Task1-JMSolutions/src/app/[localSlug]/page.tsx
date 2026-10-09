import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allLocalSlugs, parseLocalSlug, isIndexable } from '@/lib/local';
import { buildLocalMetadata } from '@/lib/seo';
import { LocalServicePage } from '@/components/sections/local/LocalServicePage';

export const dynamicParams = false;

export function generateStaticParams() {
  return allLocalSlugs().map((localSlug) => ({ localSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ localSlug: string }> }): Promise<Metadata> {
  const { localSlug } = await params;
  const hit = parseLocalSlug(localSlug);
  if (!hit) return {};
  return buildLocalMetadata(hit.service, hit.area, { index: isIndexable(hit.service, hit.area) });
}

export default async function Page({ params }: { params: Promise<{ localSlug: string }> }) {
  const { localSlug } = await params;
  const hit = parseLocalSlug(localSlug);
  if (!hit) notFound();
  
  return <LocalServicePage service={hit.service} area={hit.area} />;
}
