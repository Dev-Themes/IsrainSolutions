import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';
type Size = 'sm' | 'md' | 'lg';
type Props = { variant?: Variant; size?: Size; children: ReactNode; className?: string; as?: 'a' | 'button' } & (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>);

const variants: Record<Variant, string> = { primary: 'button button-primary', secondary: 'button button-secondary', outline: 'button button-outline', ghost: 'button button-ghost', light: 'button button-light' };
const sizes: Record<Size, string> = { sm: 'button-sm', md: 'button-md', lg: 'button-lg' };

export function Button({ variant = 'primary', size = 'md', children, className = '', as = 'button', ...props }: Props) {
  const classes = `${variants[variant]} ${sizes[size]} ${className}`.trim();
  if (as === 'a') return <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>{children}</a>;
  return <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
