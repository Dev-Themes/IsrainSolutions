import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Tag } from "@/components/ui/Tag";
import { Stat } from "@/components/ui/Stat";
import { Phone } from "lucide-react";
import { servicesHero } from "@/content/services";
import { images } from "@/lib/images";
import { ServiceIndex } from "./ServiceIndex";

export function ServicesHero() {
  return (
    <div className="relative isolate overflow-clip pt-12 md:pt-24" style={{ minHeight: 'min(64svh, 600px)' }}>
      {/* Dark background base */}
      <div className="absolute inset-0 bg-bg-0 -z-10 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url(/textures/contours.svg)] bg-repeat opacity-[0.05] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-[clamp(32px,5vw,72px)] items-center">
        
        {/* Left Column */}
        <div className="flex flex-col items-start min-w-0">
          <Breadcrumbs current="Services" />
          <Tag>{servicesHero.tag}</Tag>
          
          <h1 className="text-[clamp(2.1rem,1.2rem+4.6vw,4.4rem)] font-display font-bold leading-[1.05] text-fg-0 uppercase drop-shadow-md text-balance mb-6 max-w-full overflow-wrap-anywhere">
            {servicesHero.h1Part1} <span className="text-brand-gradient">{servicesHero.h1Accent}</span>
          </h1>
          
          <p className="text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-fg-1 max-w-[65ch] leading-relaxed mb-10">
            {servicesHero.lead}
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
            {servicesHero.facts.map((fact, idx) => (
              <Stat key={idx} text={fact} />
            ))}
          </div>
        </div>

        {/* Right Column: Media Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square isolate min-w-0 mt-8 lg:mt-0">
          {/* Edge Glow */}
          <div className="absolute -inset-[20px] bg-[image:var(--grad-brand)] opacity-20 blur-2xl -z-10 rounded-full"></div>
          
          {/* 2px grad-brand edge, cut top-right and bottom-left (mirrored logic defaults to TR/BL) */}
          <div className="relative w-full h-full p-[2px] bg-[image:var(--grad-brand)] isolate" style={{
            clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
          }}>
             {/* Inner wrapper for image */}
             <div className="relative w-full h-full bg-card overflow-hidden" style={{
                clipPath: 'polygon(0 0, calc(100% - 23px) 0, 100% 23px, 100% 100%, 23px 100%, 0 calc(100% - 23px))'
             }}>
                <Image 
                  src={images.services.hero} 
                  alt="Close-up of a condenser fan grille" 
                  fill 
                  priority
                  sizes="(min-width:1024px) 46vw, 100vw"
                  className="object-cover"
                />
             </div>
          </div>
        </div>
      </div>
      
      {/* Index below hero grid */}
      <ServiceIndex />
    </div>
  );
}
