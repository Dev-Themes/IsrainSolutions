import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
function Icon({ size = 24, children, ...props }: IconProps) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {children}
  </svg>;
}
export function Menu(props: IconProps) {
  return <Icon {...props}><path d="M4 6h16M4 12h16M4 18h16" /></Icon>;
}
export function X(props: IconProps) {
  return <Icon {...props}><path d="m6 6 12 12M6 18 18 6" /></Icon>;
}
export function Check(props: IconProps) {
  return <Icon {...props}><path d="m4 12 5 5L20 6" /></Icon>;
}
export function ArrowRight(props: IconProps) {
  return <Icon {...props}><path d="M4 12h16m-6-6 6 6-6 6" /></Icon>;
}
export function ArrowUpRight(props: IconProps) {
  return <Icon {...props}><path d="M6 18 18 6M6 6h12v12" /></Icon>;
}
export function Droplets(props: IconProps) {
  return <Icon {...props}><path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z" /><path d="M9 16a3 3 0 0 0 3 3" /></Icon>;
}
export function Phone(props: IconProps) {
  return <Icon {...props}><path d="m7 3 3 5-3 3c2 3 3 4 6 6l3-3 5 3-1 4C10 23 1 14 3 4l4-1Z" /></Icon>;
}
