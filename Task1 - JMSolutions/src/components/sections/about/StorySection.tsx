import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutContent } from "@/content/about";
import { images } from "@/lib/images";

export function StorySection() {
  const content = aboutContent.story;

  return (
    <Section bg="band" className="py-20 md:py-32">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-16 items-center">
        {/* Left: Text */}
        <div className="min-w-0">
          <SectionHeader h2Part1={content.h2Part1} h2Part2={content.h2Part2} centered={false} />
          
          <div className="flex flex-col gap-6 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-fg-1 max-w-[65ch] leading-relaxed">
            <p>{content.paragraphs[0]}</p>
            <p>
              Every call starts with a diagnosis, not a pitch. We test the system, show you what we find, and lay out your options with real numbers: what a repair costs, how long it should last, and what replacement would cost if it ever makes sense. The decision is always yours, and it is always based on <strong className="text-fg-0 font-bold">what makes sense for you</strong>, your equipment and your budget.
            </p>
            <p>{content.paragraphs[2]}</p>
          </div>
        </div>

        {/* Right: Media + Promise Card */}
        <div className="relative min-w-0 md:pr-[24px] md:pb-[32px]">
          {/* Media Wrapper */}
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] clip-chamfer p-[1px] bg-[image:var(--grad-brand)] isolate">
            <div className="relative w-full h-full clip-chamfer bg-card overflow-hidden">
              <Image 
                src={images.about.story} 
                alt="HVAC condenser unit or piping" 
                fill 
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Promise Card Overlay */}
          <div 
            className="md:absolute md:right-0 md:bottom-0 mt-6 md:mt-0 w-full md:w-[340px] bg-card border border-[image:var(--grad-brand)] p-6 clip-chamfer shadow-2xl z-20 flex flex-col gap-4"
            data-overlay="true"
          >
            <span className="text-ember text-4xl font-display font-bold leading-none -mb-4">"</span>
            <p className="text-fg-0 italic text-lg leading-snug">
              {content.promise.quote}
            </p>
            <span className="text-ice text-xs font-nav font-bold tracking-[.2em] uppercase">
              {content.promise.label}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
