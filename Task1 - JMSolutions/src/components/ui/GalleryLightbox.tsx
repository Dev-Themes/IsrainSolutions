"use client";

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-12">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer border border-stroke"
            onClick={() => setSelectedIndex(idx)}
          >
            <Image 
              src={img.src} 
              alt={img.alt} 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-bg-0/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
              <span className="text-text-0 font-bold tracking-widest uppercase text-sm border border-stroke px-4 py-2 rounded-sm bg-bg-1/80 shadow-xl">
                Click to view full
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-bg-0/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button 
            className="absolute top-6 right-6 p-2 bg-bg-1 border border-stroke text-text-0 hover:bg-bg-2 rounded-sm z-10"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full max-w-5xl aspect-video md:aspect-auto md:h-[80vh]">
            <Image 
              src={images[selectedIndex].src} 
              alt={images[selectedIndex].alt} 
              fill 
              className="object-contain" 
            />
          </div>
        </div>
      )}
    </>
  );
}
