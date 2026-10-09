import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function LogoGlow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("logo-glow relative inline-flex items-center isolate", className)}>
      {children}
    </div>
  );
}
