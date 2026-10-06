import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bg?: 'bg-0' | 'bg-1';
  id?: string;
  decorativeLayer?: ReactNode;
}

export function Section({ children, className, bg = 'bg-0', id, decorativeLayer }: SectionProps) {
  return (
    <section 
      id={id}
      className={cn(
        "relative isolate overflow-clip py-16 md:py-24 lg:py-28",
        bg === 'bg-1' ? "bg-bg-1" : "bg-bg-0",
        className
      )}
    >
      {decorativeLayer && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {decorativeLayer}
        </div>
      )}
      <div className="container-custom relative z-0 flex flex-col">
        {children}
      </div>
    </section>
  );
}
