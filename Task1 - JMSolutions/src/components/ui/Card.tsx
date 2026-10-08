"use client";

import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  variant?: 'brand' | 'cool' | 'warm';
  className?: string;
}

export function Card({ children, variant = 'brand', className }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Use requestAnimationFrame for performance
    requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--mx', `${x}px`);
        cardRef.current.style.setProperty('--my', `${y}px`);
      }
    });
  };

  const edgeVar = 
    variant === 'cool' ? 'var(--grad-cool)' : 
    variant === 'warm' ? 'var(--grad-warm)' : 
    'linear-gradient(135deg, rgba(63,160,240,.55), rgba(138,134,208,.25) 50%, rgba(236,106,71,.55))';

  const spotColor = 
    variant === 'cool' ? 'rgba(63,160,240,.22)' : 
    variant === 'warm' ? 'rgba(236,106,71,.22)' : 
    'rgba(63,160,240,.20)';

  return (
    <div 
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={cn("jm-card relative isolate text-fg-1", className)}
      style={{
        '--edge': edgeVar,
        '--spot': spotColor,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
