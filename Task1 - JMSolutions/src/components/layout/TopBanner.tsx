import Link from 'next/link';

export default function TopBanner() {
  return (
    <div className="absolute top-0 left-0 w-full z-50 bg-bg-1 text-text-0 text-sm font-bold text-center py-2 px-4 border-b border-stroke flex items-center justify-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-sm bg-ember-400 opacity-75"></span>
        <span className="relative inline-flex rounded-sm h-2 w-2 bg-ember-500"></span>
      </span>
      <span>24/7 Emergency Service: (555) 123-4567 - Call Now for Immediate Dispatch</span>
    </div>
  );
}
