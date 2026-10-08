import Image from "next/image";
import { Tag } from "@/components/ui/Tag";
import { CheckList } from "./CheckList";
import type { ServicePageData } from "@/content/service-pages";

export function WhySection({ page }: { page: ServicePageData }) {
  return (
    <section className="relative isolate py-16 md:py-24 bg-bg-0 overflow-clip">
      <div className="absolute inset-0 bg-[url(/textures/contours.svg)] bg-repeat opacity-[0.05] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,5vw,72px)] items-center">
        
        {/* Left: Text */}
        <div className="flex flex-col items-start min-w-0">
          <Tag>{page.why.tag}</Tag>
          
          <h2 className="text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold text-fg-0 uppercase mb-6 text-balance overflow-wrap-anywhere mt-2">
            {page.why.h2.lead} <span className="text-brand-gradient">{page.why.h2.accent}</span>
          </h2>
          
          <div className="space-y-4 text-fg-1 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] max-w-[65ch] leading-relaxed">
            {page.why.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <CheckList items={page.why.checklist} variant={page.variant} />
        </div>

        {/* Right: Media Frame */}
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2] isolate min-w-0">
          {/* Edge Glow */}
          <div className="absolute -inset-[20px] bg-[image:var(--grad-brand)] opacity-10 blur-2xl -z-10 rounded-full"></div>
          
          <div className="relative w-full h-full p-[2px] bg-[image:var(--grad-brand)] isolate" style={{
            clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
          }}>
             <div className="relative w-full h-full bg-card overflow-hidden" style={{
                clipPath: 'polygon(0 0, calc(100% - 23px) 0, 100% 23px, 100% 100%, 23px 100%, 0 calc(100% - 23px))'
             }}>
                <Image 
                  src={page.why.image} 
                  alt={page.name + " equipment detail"} 
                  fill 
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
