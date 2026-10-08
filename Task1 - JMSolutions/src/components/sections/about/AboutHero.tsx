import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tag } from "@/components/ui/Tag";
import { Stat } from "@/components/ui/Stat";
import { Phone } from "lucide-react";
import { aboutContent } from "@/content/about";
import { images } from "@/lib/images";

export function AboutHero() {
  const content = aboutContent.hero;

  return (
    <div className="relative isolate overflow-clip py-12 md:py-24" style={{ minHeight: 'min(70svh, 640px)' }}>
      {/* Dark background base */}
      <div className="absolute inset-0 bg-bg-0 -z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/textures/contours.svg')] bg-repeat opacity-[0.05] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="container-custom h-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(32px,5vw,72px)] items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start min-w-0">
          <Breadcrumbs current="About Us" />
          <Tag>{content.tag}</Tag>
          
          <h1 className="text-[clamp(2.1rem,1.2rem+4.6vw,4.4rem)] font-display font-bold leading-[1.05] text-fg-0 uppercase drop-shadow-md text-balance mb-6 max-w-full overflow-wrap-anywhere">
            {content.h1Part1} <span className="text-brand-gradient">{content.h1Brand}</span>
          </h1>
          
          <p className="text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-fg-1 max-w-[65ch] leading-relaxed mb-10">
            {content.lead}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <Button href="/contact" variant="primary">
              Get a Free Quote
            </Button>
            <Button href="tel:5551234567" variant="outline">
              <Phone className="w-4 h-4" /> Call Now: (555) 123-4567
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {content.facts.map((fact, idx) => (
              <Stat key={idx} text={fact} />
            ))}
          </div>
        </div>

        {/* Right Column: Media Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square isolate min-w-0 mt-8 lg:mt-0">
          {/* Edge Glow */}
          <div className="absolute -inset-[20px] bg-[image:var(--grad-brand)] opacity-20 blur-2xl -z-10 rounded-full"></div>
          
          <div className="relative w-full h-full p-[2px] bg-[image:var(--grad-brand)] clip-chamfer pb-8 lg:pb-12 mr-6 lg:mr-0 isolate">
             {/* Inner wrapper for image */}
             <div className="relative w-full h-full bg-card clip-chamfer overflow-hidden">
                <Image 
                  src={images.about.hero} 
                  alt="Close-up of an air conditioner condenser coil" 
                  fill 
                  priority
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover"
                />
             </div>

             {/* Overlapping Skewed Badge */}
             <div className="absolute bottom-4 left-4 lg:-left-6 z-40 transform skew-x-[-12deg] bg-[image:var(--grad-brand)] px-6 py-3 shadow-xl">
               <span className="block transform skew-x-[12deg] text-white font-bold text-[clamp(12px,1.5vw,14px)] tracking-[.14em] uppercase whitespace-nowrap">
                 {content.badge}
               </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
