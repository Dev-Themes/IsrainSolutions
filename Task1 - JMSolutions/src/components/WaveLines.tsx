export default function WaveLines() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
      <svg className="w-[200%] h-full animate-drift" viewBox="0 0 2000 400" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 200 C 500 100, 500 300, 1000 200 C 1500 100, 1500 300, 2000 200" fill="none" stroke="var(--color-cool-500)" strokeWidth="2" />
        <path d="M0 220 C 500 120, 500 320, 1000 220 C 1500 120, 1500 320, 2000 220" fill="none" stroke="var(--color-cool-600)" strokeWidth="1" opacity="0.5" />
        
        <path d="M0 180 C 500 280, 500 80, 1000 180 C 1500 280, 1500 80, 2000 180" fill="none" stroke="var(--color-heat-500)" strokeWidth="2" />
        <path d="M0 160 C 500 260, 500 60, 1000 160 C 1500 260, 1500 60, 2000 160" fill="none" stroke="var(--color-heat-600)" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );
}
