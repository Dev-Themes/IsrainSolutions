import Link from 'next/link';
import { servicesHero, services } from '@/content/services';
import { House, Building2, Snowflake, Wrench } from 'lucide-react';

const ICONS = {
  House,
  Building2,
  Snowflake,
  Wrench
};

export function ServiceIndex() {
  return (
    <div className="container-custom mt-12 pb-12">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const Icon = ICONS[service.icon];
          const number = String(index + 1).padStart(2, '0');
          
          return (
            <li key={service.id}>
              <Link 
                href={`#${service.anchor}`}
                className="group flex flex-col gap-3 p-4 bg-card border border-line clip-chamfer relative isolate overflow-hidden min-h-[100px] hover:-translate-y-1 transition-transform"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[image:var(--grad-brand)] opacity-0 group-hover:opacity-10 transition-opacity z-[-1]"></div>
                {/* Top Border Accent */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[image:var(--grad-brand)] opacity-30 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-fg-1 group-hover:text-ice transition-colors" />
                  <span className="text-[12px] font-nav font-bold tracking-widest text-fg-2 aria-hidden">
                    {number}
                  </span>
                </div>
                
                <span className="text-[14px] font-bold uppercase tracking-wider text-fg-0 mt-auto">
                  {servicesHero.index[index].label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
