import { ChevronRight } from 'lucide-react';
import { ServiceItem } from '@/content/services';

interface ServiceItemListProps {
  items: ServiceItem[];
  variant: 'cool' | 'warm';
}

export function ServiceItemList({ items, variant }: ServiceItemListProps) {
  const chevronColor = variant === 'cool' ? 'text-ice' : 'text-ember';

  return (
    <div className="@container w-full mb-10">
      <dl className="grid grid-cols-1 @[30rem]:grid-cols-2 gap-x-8 gap-y-6">
        {items.map((item, i) => (
          <div key={i} className="group flex items-start gap-3 min-w-0 h-full">
            <div className="mt-[2px] shrink-0 transform transition-transform duration-300 group-hover:translate-x-[3px] @media (hover: hover) and (pointer: fine) {}">
              <ChevronRight className={`w-4 h-4 ${chevronColor}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <dt className="font-display font-bold uppercase text-[0.8125rem] tracking-[.06em] text-fg-0 mb-1 leading-tight truncate overflow-hidden">
                {item.title}
              </dt>
              <dd className="text-fg-1 text-[clamp(14px,0.9vw,15px)] leading-relaxed max-w-[40ch]">
                {item.description}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
