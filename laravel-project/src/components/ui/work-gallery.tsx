"use client";

import * as React from "react";
import Image from "next/image";
import { X, ZoomIn, MapPin } from "lucide-react";

export interface GalleryPhoto {
  id: string;
  title: string;
  trade: string;
  location: string;
  caption: string;
  accentColor: string;
  aspect: string;
  imageUrl?: string;
}

interface WorkGalleryProps {
  photos: GalleryPhoto[];
}

export function WorkGallery({ photos }: WorkGalleryProps) {
  const [activePhoto, setActivePhoto] = React.useState<GalleryPhoto | null>(null);

  // Close on Escape key
  React.useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePhoto(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative rounded-[var(--radius)] overflow-hidden border border-[var(--line)] bg-[var(--surface)] shadow-soft cursor-pointer transition-all hover:border-[var(--brand)]"
          >
            {/* Documentary Photo Frame */}
            <div
              className={`w-full ${photo.aspect} flex items-center justify-center relative p-6 transition-transform group-hover:scale-[1.02] overflow-hidden`}
              style={{ backgroundColor: photo.accentColor }}
            >
              {photo.imageUrl && (
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {/* Overlay with technical schematics */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
              <div className="w-full h-full relative z-10 border border-[rgba(255,255,255,0.25)] rounded-[var(--radius-sm)] flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded">
                    {photo.trade}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center">
                    <ZoomIn className="w-3.5 h-3.5 opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight drop-shadow-md text-white">
                    {photo.title}
                  </div>
                  <div className="text-[10px] opacity-90 flex items-center mt-1 text-white">
                    <MapPin className="w-3 h-3 mr-1 text-[var(--accent)]" />
                    <span>{photo.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 border-t border-[var(--line)]">
              <h4 className="font-bold text-xs text-[var(--text)] mb-1">
                {photo.title}
              </h4>
              <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div
            className="fixed inset-0"
            onClick={() => setActivePhoto(null)}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-2xl bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--line)] shadow-2xl overflow-hidden p-6">
            <div className="flex items-start justify-between pb-4 border-b border-[var(--line)]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                  {activePhoto.trade} &middot; {activePhoto.location}
                </span>
                <h3 id="lightbox-title" className="text-lg font-bold text-[var(--text)] mt-0.5">
                  {activePhoto.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="p-2 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--line)] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Detailed Photo Display */}
            <div
              className="w-full h-72 sm:h-96 rounded-[var(--radius)] my-4 flex items-end justify-center p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: activePhoto.accentColor }}
            >
              {activePhoto.imageUrl && (
                <Image
                  src={activePhoto.imageUrl}
                  alt={activePhoto.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative z-10 border border-[rgba(255,255,255,0.25)] rounded-[var(--radius)] p-4 sm:p-5 text-left w-full bg-black/60 backdrop-blur-xs">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--accent)] block mb-1">
                  Documented Site Photographic Record &middot; Verified
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  {activePhoto.title}
                </h4>
                <p className="text-xs text-[rgba(255,255,255,0.9)] leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </div>

            <div className="text-xs text-[var(--text-muted)] flex items-center justify-between pt-2">
              <span>Verified contractor site photographic record</span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                Close preview (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
