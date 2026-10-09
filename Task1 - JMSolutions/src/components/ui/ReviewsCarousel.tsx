"use client";

import { useEffect, useState, useRef } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  source: string;
  date: string;
  stars: number;
  quote: string;
  initial: string;
  name: string;
}

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setProgress(0);
      return;
    }
    setProgress(scrollLeft / maxScroll);
  };

  // Auto-scroll logic
  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const interval = setInterval(() => {
      scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scrollPrev = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft <= 10) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
        scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: "smooth" });
      }
    }
  };

  const scrollNext = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
        scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
      }
    }
  };

  return (
    <div 
      className="relative animate-fade-in-up w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 scrollbar-hide items-start w-full" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((review, i) => (
          <div 
            key={i} 
            className="w-[260px] max-w-[85vw] sm:w-full sm:max-w-none sm:min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-start shrink-0 clip-chamfer bg-card border border-line p-5 sm:p-8 flex flex-col relative isolate h-auto"
          >
            <div className="absolute inset-[1px] bg-bg-1 clip-chamfer -z-10" style={{clipPath: 'polygon(0 0, calc(100% - 17.6px) 0, 100% 17.6px, 100% 100%, 17.6px 100%, 0 calc(100% - 17.6px))'}}></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest border border-line px-3 py-1 bg-card">
                {review.source}
              </div>
              <span className="text-fg-2 text-sm">{review.date}</span>
            </div>
            <div className="flex gap-1 mb-6 text-ember">
              {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-fg-0 italic mb-6 text-[15px] leading-relaxed">"{review.quote}"</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="w-12 h-12 bg-[image:var(--grad-brand)] flex items-center justify-center font-bold text-white text-xl clip-chamfer" style={{'--cut': '8px'} as any}>{review.initial}</div>
              <div>
                <div className="font-bold text-fg-0 font-nav uppercase tracking-wide text-sm">{review.name}</div>
                <div className="text-xs text-fg-2 uppercase tracking-widest mt-1">Verified Customer</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel controls - visual indicators */}
      <div className="flex justify-center items-center gap-4 mt-2">
         <button aria-label="Previous review" onClick={scrollPrev} className="w-10 h-10 border border-line bg-card hover:bg-[image:var(--grad-brand)] transition-all flex justify-center items-center clip-chamfer text-white hover:text-white group z-10 cursor-pointer">
           <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
         </button>
         <div className="w-16 h-2 bg-line rounded-none flex items-center p-[1px] relative">
           <div 
             className="h-full bg-[image:var(--grad-brand)] transition-all duration-300 absolute"
             style={{ width: '33%', left: `${progress * 67}%` }}
           ></div>
         </div>
         <button aria-label="Next review" onClick={scrollNext} className="w-10 h-10 border border-line bg-card hover:bg-[image:var(--grad-brand)] transition-all flex justify-center items-center clip-chamfer text-white hover:text-white group z-10 cursor-pointer">
           <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
         </button>
      </div>
    </div>
  );
}
