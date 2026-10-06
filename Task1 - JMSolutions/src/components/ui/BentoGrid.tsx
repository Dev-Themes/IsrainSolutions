import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function BentoGrid({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-6 w-full items-stretch", className)}>
      {children}
    </div>
  );
}

export function BentoItem({ 
  children, 
  colSpan = 4, 
  className 
}: { 
  children: ReactNode, 
  colSpan?: number,
  className?: string 
}) {
  const spans: Record<number, string> = {
    3: "lg:col-span-3",
    4: "lg:col-span-4",
    5: "lg:col-span-5",
    6: "lg:col-span-6",
    7: "lg:col-span-7",
    8: "lg:col-span-8",
    9: "lg:col-span-9",
    10: "lg:col-span-10",
    12: "lg:col-span-12"
  };
  const spanClass = spans[colSpan] || "lg:col-span-4";

  return (
    <div className={cn("md:col-span-full", spanClass, className)}>
      {children}
    </div>
  );
}
