import { TriangleAlert, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EmergencyCardProps {
  headline: string;
  text: string;
}

export function EmergencyCard({ headline, text }: EmergencyCardProps) {
  return (
    <div className="relative w-full p-6 sm:p-8 isolate mt-6 lg:mt-0 min-w-0">
      {/* Border & Background */}
      <div 
        className="absolute inset-0 bg-card -z-10"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)'
        }}
      >
        <div className="absolute inset-0 bg-ember/10 pointer-events-none mix-blend-screen"></div>
        {/* 1px ember->flame gradient border */}
        <div 
          className="absolute inset-0 p-[1px] bg-[image:var(--grad-warm)] -z-20"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)'
          }}
        >
          <div 
            className="w-full h-full bg-card"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 23px) 0, 100% 23px, 100% 100%, 0 100%)'
            }}
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <TriangleAlert className="w-6 h-6 text-ember shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display font-bold uppercase tracking-wide text-fg-0 text-xl leading-tight mb-2">
              {headline}
            </h3>
            <p className="text-fg-1 text-[clamp(14px,1vw,16px)] leading-snug">
              {text}
            </p>
          </div>
        </div>
        <div className="mt-2 w-full sm:w-auto">
          <Button href="tel:5551234567" variant="warm" className="w-full sm:w-auto">
            <Phone className="w-4 h-4 fill-current" /> Call (555) 123-4567
          </Button>
        </div>
      </div>
    </div>
  );
}
