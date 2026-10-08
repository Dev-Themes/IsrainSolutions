export function Tag({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-[image:var(--grad-brand)] text-ice text-[12px] font-nav font-bold tracking-[.24em] uppercase bg-card/50 backdrop-blur-sm clip-chamfer ${className}`} style={{'--cut': '6px'} as any}>
      {children}
    </div>
  );
}
