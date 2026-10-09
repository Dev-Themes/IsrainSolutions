import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";
import { aboutContent } from "@/content/about";
import { images } from "@/lib/images";

export function PhilosophySection() {
  const content = aboutContent.philosophy;

  return (
    <Section bg="bg-0" className="py-20 md:py-32">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 items-start">
        
        {/* Left: Media (Order 2 on mobile, 1 on desktop) */}
        <div className="order-2 lg:order-1 relative w-full min-h-[300px] md:min-h-[400px] lg:h-full lg:max-h-[600px] aspect-[4/3] lg:aspect-auto clip-chamfer p-[1px] bg-line lg:sticky lg:top-32 isolate min-w-0">
          <div className="relative w-full h-full bg-card overflow-hidden clip-chamfer">
             <Image 
                src={images.about.philosophy} 
                alt="Outdoor condenser units on gravel" 
                fill 
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover"
              />
          </div>
        </div>

        {/* Right: Text (Order 1 on mobile, 2 on desktop) */}
        <div className="order-1 lg:order-2 min-w-0">
          <Tag>{content.tag}</Tag>
          
          <h2 className="text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold text-fg-0 mb-8 text-balance">
            {content.h2Part1} <span className="text-brand-gradient">{content.h2Part2}</span>
          </h2>
          
          <div className="flex flex-col gap-6 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-fg-1 max-w-[65ch] leading-relaxed mb-10">
            {content.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <blockquote className="border-l-[4px] border-[image:var(--grad-brand)] bg-[#277BC5]/[0.08] p-6 mb-12">
            <p className="text-fg-0 italic font-medium text-lg">"{content.callout}"</p>
          </blockquote>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Repair Card */}
            <div className="bg-bg-1 border border-line clip-chamfer p-6 sm:p-8 flex flex-col min-w-0">
              <div className="w-12 h-1 bg-[image:var(--grad-cool)] mb-6 transform skew-x-[-12deg]"></div>
              <h3 className="text-white font-bold font-display text-xl mb-4 leading-tight">{content.cards.repair.title}</h3>
              <ul className="flex flex-col gap-3 text-sm text-fg-1">
                {content.cards.repair.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue mt-0.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Replace Card */}
            <div className="bg-bg-1 border border-line clip-chamfer p-6 sm:p-8 flex flex-col min-w-0">
              <div className="w-12 h-1 bg-[image:var(--grad-warm)] mb-6 transform skew-x-[-12deg]"></div>
              <h3 className="text-white font-bold font-display text-xl mb-4 leading-tight">{content.cards.replace.title}</h3>
              <ul className="flex flex-col gap-3 text-sm text-fg-1">
                {content.cards.replace.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-ember mt-0.5">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
