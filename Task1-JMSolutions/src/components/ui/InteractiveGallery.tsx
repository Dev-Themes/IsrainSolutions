"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Search, X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  description: string;
}

export function InteractiveGallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="container-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div 
            key={i} 
            className="relative aspect-[3/2] clip-chamfer overflow-hidden group border border-line cursor-pointer bg-card"
            onClick={() => setSelectedIndex(i)}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-bg-0/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center border-[2px] border-[image:var(--grad-brand)]">
              <Search className="w-8 h-8 text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100" />
              <span className="text-white font-nav font-bold uppercase tracking-wider text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                View Details
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {mounted && selectedIndex !== null && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-bg-0/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 md:p-12 animate-fade-in-up"
          onClick={() => setSelectedIndex(null)}
        >
          <div 
            className="relative w-full max-w-[1000px] max-h-[85vh] bg-card border border-line clip-chamfer shadow-2xl flex flex-col lg:flex-row overflow-hidden isolate"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-[1px] bg-bg-1 clip-chamfer -z-10" style={{clipPath: 'polygon(0 0, calc(100% - 17.6px) 0, 100% 17.6px, 100% 100%, 17.6px 100%, 0 calc(100% - 17.6px))'}}></div>
            
            {/* Close Button - Now inside the modal panel */}
            <button 
              className="absolute top-2 right-2 md:top-4 md:right-4 p-2 bg-bg-0 border border-line text-fg-0 hover:bg-[image:var(--grad-brand)] hover:text-white hover:border-transparent rounded-sm z-[60] transition-all cursor-pointer shadow-lg clip-chamfer group"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
              style={{'--cut': '6px'} as any}
            >
              <X className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90" />
            </button>
            
            {/* Image Area */}
            <div className="relative w-full lg:w-[55%] h-[30vh] lg:h-auto min-h-[200px] md:min-h-[300px] bg-bg-0 border-r border-line isolate shrink-0">
              <Image 
                src={images[selectedIndex].src} 
                alt={images[selectedIndex].alt} 
                fill 
                className="object-cover lg:object-contain p-0 lg:p-4 z-10" 
              />
              <div className="absolute inset-0 -z-10 bg-[image:var(--grad-brand)] opacity-10 blur-2xl"></div>
            </div>
            
            {/* Details Area */}
            <div className="w-full lg:w-[45%] p-5 sm:p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] lg:max-h-[85vh]">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[image:var(--grad-brand)] text-ice text-[10px] sm:text-[12px] font-nav font-bold tracking-[.2em] sm:tracking-[.24em] uppercase self-start bg-bg-0">
                PROJECT DETAILS
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-fg-0 mb-4">{images[selectedIndex].alt}</h3>
              <div className="w-16 h-1 bg-[image:var(--grad-brand)] mb-6 transform skew-x-[-12deg]"></div>
              <p className="text-fg-1 leading-relaxed text-[14px] sm:text-[16px] flex-1">
                {images[selectedIndex].description}
              </p>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
