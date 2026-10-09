import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'warm' | 'cool' | 'outline';
  className?: string;
  isLoading?: boolean;
}

export function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className, 
  isLoading, 
  disabled,
  ...props 
}: ButtonProps) {
  
  // Handled via CSS module or global classes based on prompt spec,
  // but implemented here with tailwind utility logic and custom class
  
  const base = "btn group relative inline-flex items-center justify-center min-h-[52px] px-[30px] border-0 cursor-pointer overflow-hidden isolate transition-all text-white font-bold text-[14px] leading-none tracking-[.14em] uppercase font-nav";
  
  // --skew handled in CSS class "btn" below, but we can do inline styling for token injection if needed.
  // Actually, I'll put the CSS in globals.css as specified and use the class name 'btn'.
  // We need to pass the proper variant class.
  
  const variantClasses = {
    primary: "btn-primary bg-[image:var(--grad-fill-cta)]",
    warm: "btn-warm bg-[image:var(--grad-warm)]",
    cool: "btn-cool bg-[image:var(--grad-cool)]",
    outline: "btn-outline bg-transparent border-t border-b border-t-line border-b-line hover:bg-white/[0.12]",
  };

  const classes = cn(base, variantClasses[variant], className, disabled || isLoading ? "opacity-70 pointer-events-none" : "");

  const InnerContent = () => (
    <span className="inline-flex items-center gap-[10px] transform skew-x-[12deg] group-hover:skew-x-[12deg] transition-transform">
      {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : children}
    </span>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('[');
    
    if (isExternal) {
      return (
        <a href={href} className={classes} style={{ transform: 'skewX(-12deg)' }}>
          <span className="inline-flex items-center gap-[10px] transform skew-x-[12deg]">
            {children}
          </span>
        </a>
      );
    }
    
    return (
      <Link href={href} className={classes} style={{ transform: 'skewX(-12deg)' }}>
        <span className="inline-flex items-center gap-[10px] transform skew-x-[12deg]">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <button className={classes} style={{ transform: 'skewX(-12deg)' }} disabled={disabled || isLoading} {...props}>
      <span className="inline-flex items-center gap-[10px] transform skew-x-[12deg]">
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : children}
      </span>
    </button>
  );
}
