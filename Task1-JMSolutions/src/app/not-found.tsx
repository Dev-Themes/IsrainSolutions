import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-32 bg-bg-0 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ice-500/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-bg-2 border border-stroke rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(47,140,255,0.15)]">
          <AlertTriangle className="w-10 h-10 text-ice-500" />
        </div>
        <h1 className="text-8xl md:text-[150px] font-display font-bold text-text-0 mb-4 leading-none drop-shadow-lg">
          4<span className="text-ice-500">0</span>4
        </h1>
        <h2 className="text-2xl md:text-4xl font-display font-bold text-text-1 mb-6">Page Not Found</h2>
        <p className="text-text-2 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Don't worry, we can still get your comfort restored.
        </p>
        <Button href="/" className="py-4 px-10 text-sm font-bold uppercase tracking-widest bg-ice-500 text-bg-0 hover:bg-ice-400 shadow-[0_0_20px_rgba(47,140,255,0.4)] transition-all">
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
