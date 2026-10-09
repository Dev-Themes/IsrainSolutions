import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassBoxProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'ice' | 'ember' | 'cryo';
}

export function GlassBox({ children, className, glowColor }: GlassBoxProps) {
  const glowClass = glowColor === 'ice' ? "group-hover:shadow-[0_0_30px_rgba(47,140,255,0.4)] hover:border-ice-500/50" :
                    glowColor === 'ember' ? "group-hover:shadow-[0_0_30px_rgba(244,81,30,0.4)] hover:border-ember-500/50" :
                    glowColor === 'cryo' ? "group-hover:shadow-[0_0_30px_rgba(94,234,212,0.4)] hover:border-cryo-400/50" : "hover:border-stroke/80 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]";

  return (
    <div 
      className={cn(
        "group relative flex flex-col rounded-sm bg-bg-2 p-6 md:p-8 border border-stroke transition-all duration-500",
        "hover:-translate-y-2 hover:bg-[#1A233A]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
        glowClass,
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity rounded-t-sm"></div>
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
