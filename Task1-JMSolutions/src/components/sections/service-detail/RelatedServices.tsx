import Link from "next/link";
import * as Icons from "lucide-react";
import { servicePages } from "@/content/service-pages";

export function RelatedServices({ current }: { current: string }) {
  const otherServices = Object.values(servicePages).filter(s => s.slug !== current);

  return (
    <section className="relative isolate py-16 md:py-24 bg-bg-0 overflow-clip">
      <div className="absolute inset-0 bg-[url(/textures/contours.svg)] bg-repeat opacity-[0.05] mix-blend-screen -z-10 pointer-events-none"></div>

      <div className="container-custom">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-fg-0 uppercase mb-4">
            Other <span className="text-brand-gradient">Services</span>
          </h2>
          <div className="h-[3px] w-12 bg-[image:var(--grad-brand)]"></div>
        </div>

        <nav aria-label="Other services">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((service) => {
              const Icon = (Icons as any)[service.icon] || Icons.Wrench;
              const cutCorner = 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))';
              const innerCutCorner = 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))';

              return (
                <li key={service.slug} className="h-full">
                  <Link 
                    href={`/services/${service.slug}`}
                    className="group block relative w-full h-full p-[1px] bg-line hover:bg-[image:var(--grad-brand)] transition-colors isolate focus:outline-none focus-visible:ring-2 focus-visible:ring-ice focus-visible:ring-offset-2 focus-visible:ring-offset-bg-0 rounded-sm"
                    style={{ clipPath: cutCorner }}
                    aria-label={`Learn more about ${service.name}`}
                  >
                    <div 
                      className="relative w-full h-full bg-card p-6 flex flex-col items-start"
                      style={{ clipPath: innerCutCorner }}
                    >
                      <div className="flex items-center justify-between w-full mb-4">
                        <Icon className="w-6 h-6 text-fg-1 group-hover:text-ice transition-colors" aria-hidden="true" />
                        <Icons.ArrowRight className="w-5 h-5 text-fg-1 group-hover:text-ice transition-all group-hover:translate-x-1" aria-hidden="true" />
                      </div>
                      <h3 className="font-display font-bold uppercase tracking-[0.06em] text-fg-0 text-lg mb-2 group-hover:text-ice transition-colors">
                        {service.shortName}
                      </h3>
                      <p className="text-fg-1 text-sm line-clamp-2">
                        {service.heroLead}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
}
