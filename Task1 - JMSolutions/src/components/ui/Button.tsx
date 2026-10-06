import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'ghost';
  className?: string;
}

export function Button({ children, href, variant = 'primary', className }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-bold transition-all rounded-sm px-6 py-3";
  
  const variants = {
    primary: "bg-ember-500 text-bg-0 hover:bg-ember-400 hover:shadow-[0_0_20px_rgba(244,81,30,0.4)]",
    secondary: "bg-bg-3 text-text-0 border border-stroke hover:bg-bg-2",
    glass: "bg-white/[0.04] text-text-0 border border-stroke hover:bg-white/[0.08]",
    ghost: "text-ice-400 hover:text-ice-500 bg-transparent hover:bg-ice-500/10 px-4",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}
