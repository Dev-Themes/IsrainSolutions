import type { Metadata } from 'next';
import { aboutMetadata } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { aboutSchema } from '@/lib/schema';
import { AboutHero } from '@/components/sections/about/AboutHero';
import { StorySection } from '@/components/sections/about/StorySection';
import { PhilosophySection } from '@/components/sections/about/PhilosophySection';
import { ValuesGrid } from '@/components/sections/about/ValuesGrid';
import { JourneyTimeline } from '@/components/sections/about/JourneyTimeline';

export const metadata: Metadata = aboutMetadata();

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutSchema()} />
      <AboutHero />
      <StorySection />
      <PhilosophySection />
      <ValuesGrid />
      <JourneyTimeline />

    </>
  );
}
