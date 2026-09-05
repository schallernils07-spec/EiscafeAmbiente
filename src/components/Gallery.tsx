import React, { useState } from 'react';
import { Camera, X, ZoomIn, Info } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/cafeData';
import { GalleryPhoto } from '../types';

export const Gallery: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-[#f4efe8]/50 border-t border-[#eeeae4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
              <Camera className="w-3.5 h-3.5" />
              Eindrücke
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
              Bildergalerie
            </h2>
            <p className="mt-2 text-base text-[#6e6359]">
              Atmosphäre, Genuss und kleine Momente zum Verweilen im Eiscafé Ambiente.
            </p>
          </div>

          {/* Hinweis für Betreiber */}
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#8b7e74] bg-[#eeeae4] px-3 py-1.5 rounded-lg border border-[#ddd6cd]">
              <Info className="w-3.5 h-3.5 text-[#4a3728]" />
              <span>Tippe auf ein Foto für die Großansicht</span>
            </div>
          </div>
        </div>

        {/* Responsive Image Grid (optimized for mobile smartphones & desktop) */}
        {/* HINWEIS AN DEN BETREIBER: In `src/data/cafeData.ts` können die Bildlinks durch Originalfotos des Eiscafé Ambiente ersetzt werden. */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {GALLERY_PHOTOS.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative aspect-4/3 sm:aspect-square rounded-xl overflow-hidden border border-[#eeeae4] bg-[#eeeae4] focus:outline-hidden focus:ring-2 focus:ring-[#4a3728] text-left cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md"
              aria-label={`Bild vergrößern: ${photo.title}`}
            >
              <img
                src={photo.imageUrl}
                alt={photo.alt}
                className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay on hover / touch feedback */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-[11px] font-medium text-[#eeeae4] uppercase tracking-wider">
                  {photo.category}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white truncate">
                  {photo.title}
                </span>
                <div className="absolute top-3 right-3 p-1.5 rounded-full bg-white/30 backdrop-blur-xs text-white">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Notice box indicating original photo replacement for production */}
        <div className="mt-8 text-center text-xs text-[#8b7e74] border-t border-[#eeeae4] pt-4">
          <p>
            <em>Hinweis für den Betreiber:</em> Eigene Café- und Eisfotos können jederzeit zentral in der Datei <code className="bg-[#eeeae4] px-1.5 py-0.5 rounded text-[#4a3728]">cafeData.ts</code> hinterlegt werden.
          </p>
        </div>

        {/* Lightbox Modal for Full Size View */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-[#2d2d2d] rounded-xl overflow-hidden shadow-2xl border border-white/15"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus:outline-hidden focus:ring-2 focus:ring-white"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-4/3 sm:aspect-16/10 bg-black max-h-[70vh]">
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.alt}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-4 sm:p-5 bg-[#252525] text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#c28e46]">
                    {activePhoto.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-serif-title font-medium text-[#fdfbf7]">
                    {activePhoto.title}
                  </h3>
                </div>
                <p className="text-xs text-[#8b7e74]">
                  Eiscafé Ambiente · Kurzackerstraße 10, Pößneck
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
