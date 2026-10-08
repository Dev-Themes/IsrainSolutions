export function SectionHeader({ 
  h2Part1, 
  h2Part2, 
  subtext, 
  centered = true 
}: { 
  h2Part1: string, 
  h2Part2: string, 
  subtext?: string,
  centered?: boolean
}) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-[clamp(1.7rem,1.1rem+2.6vw,3rem)] font-display font-bold text-fg-0 mb-4 ${centered ? 'flex flex-col items-center' : 'flex flex-col items-start'} text-balance`}>
        <span>{h2Part1} <span className="text-brand-gradient">{h2Part2}</span></span>
        <div className={`w-[88px] h-[4px] mt-4 bg-[image:var(--grad-brand)] transform skew-x-[-20deg]`}></div>
      </h2>
      {subtext && (
        <p className={`mt-4 text-fg-1 max-w-[65ch] ${centered ? 'mx-auto' : ''}`}>{subtext}</p>
      )}
    </div>
  );
}
