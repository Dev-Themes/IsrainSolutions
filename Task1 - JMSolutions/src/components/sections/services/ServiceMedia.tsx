import Image from 'next/image';
import { images } from '@/lib/images';

interface ServiceMediaProps {
  imageKey: keyof typeof images.services;
  alt: string;
  side: 'left' | 'right';
  variant: 'cool' | 'warm';
}

export function ServiceMedia({ imageKey, alt, side, variant }: ServiceMediaProps) {
  // Use a fallback blurDataURL or placeholder if needed, Unsplash URLs can't use Next placeholder="blur"
  // without a static import or dynamic blurDataURL, so we'll omit it or use an empty blur data URL.
  
  const clipLeft = 'polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, var(--cut) 100%, 0 calc(100% - var(--cut)))';
  const clipRight = 'polygon(var(--cut) 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%, 0 var(--cut))';

  const clipPathStr = side === 'left' ? clipLeft : clipRight;
  const gradientClass = variant === 'cool' ? 'bg-[image:var(--grad-cool)]' : 'bg-[image:var(--grad-warm)]';
  
  return (
    <div 
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2] isolate min-w-0"
      style={{ '--cut': 'clamp(16px, 2vw, 28px)' } as React.CSSProperties}
    >
      {/* Glow behind the cut edges */}
      <div 
        className={`absolute -inset-[20px] ${gradientClass} opacity-10 blur-xl -z-10`}
      ></div>

      <div 
        className={`relative w-full h-full p-[2px] ${gradientClass} isolate`}
        style={{ clipPath: clipPathStr }}
      >
        <div 
          className="relative w-full h-full bg-card overflow-hidden"
          style={{ clipPath: clipPathStr }}
        >
          <Image 
            src={images.services[imageKey] || images.services.residential}
            alt={alt}
            fill
            sizes="(min-width:1024px) 46vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
