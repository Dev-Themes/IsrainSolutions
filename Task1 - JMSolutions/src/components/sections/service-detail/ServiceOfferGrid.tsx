import * as Icons from "lucide-react";
import type { ServicePageData } from "@/content/service-pages";

export function ServiceOfferGrid({ page }: { page: ServicePageData }) {
  return (
    <section className="relative isolate py-16 md:py-24 bg-band overflow-clip">
      <div className="absolute inset-0 bg-[url(/textures/contours.svg)] bg-repeat opacity-[0.12] mix-blend-screen -z-10 pointer-events-none"></div>
      
      {/* Glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square bg-ice/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square bg-ember/10 blur-[120px] rounded-full -z-10"></div>

      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold text-fg-0 uppercase mb-4 text-balance">
            {page.offerHeading.lead} <span className="text-brand-gradient">{page.offerHeading.accent}</span>
          </h2>
          <div className="h-[3px] w-12 bg-[image:var(--grad-brand)] mx-auto mb-6"></div>
          <p className="text-fg-1 text-lg">
            {page.offerSubtext}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {page.offers.map((offer, index) => {
            const Icon = (Icons as any)[offer.icon] || Icons.Wrench;
            // pattern: cool, warm, warm, cool, cool, warm
            const variants = ['cool', 'warm', 'warm', 'cool', 'cool', 'warm'];
            const cardVariant = variants[index % variants.length] || 'cool';
            const accentClass = cardVariant === 'cool' ? 'text-ice' : 'text-ember';

            // mirror cut corners on alternating cards
            const cutCorner = index % 2 === 0 
              ? 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))'
              : 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)';
              
            const innerCutCorner = index % 2 === 0
              ? 'polygon(0 0, calc(100% - 19px) 0, 100% 19px, 100% 100%, 19px 100%, 0 calc(100% - 19px))'
              : 'polygon(19px 0, 100% 0, 100% calc(100% - 19px), calc(100% - 19px) 100%, 0 100%, 0 19px)';

            return (
              <li key={index} className="h-full">
                <div 
                  className="relative w-full h-full p-[1px] bg-[image:var(--grad-brand)] isolate group"
                  style={{ clipPath: cutCorner }}
                >
                  <div 
                    className="relative w-full h-full bg-card p-6 flex flex-col items-start hover:bg-bg-0/50 transition-colors"
                    style={{ clipPath: innerCutCorner }}
                  >
                    <Icon className={`w-7 h-7 mb-4 ${accentClass}`} aria-hidden="true" />
                    <h3 className="font-display font-bold uppercase tracking-[0.06em] text-fg-0 text-base mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-fg-1 text-[15px] leading-relaxed">
                      {offer.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
