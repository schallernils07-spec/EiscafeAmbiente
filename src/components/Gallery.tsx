import React, { useState, useEffect } from 'react';
import { Camera, X, ZoomIn, Info, ExternalLink, Trash2 } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { GalleryPhoto } from '../types';
import { useCafeImages } from '../context/CafeImageContext';

const STORAGE_KEY = 'ambiente_custom_photos';

export const Gallery: React.FC = () => {
  const { slots } = useCafeImages();
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>([]);

  // Load custom user photos from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCustomPhotos(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleDeleteCustomPhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customPhotos.filter((p) => p.id !== id);
    setCustomPhotos(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (activePhoto?.id === id) {
      setActivePhoto(null);
    }
  };

  const slotPhotos: GalleryPhoto[] = [
    {
      id: 'photo-theke',
      title: slots.theke.title,
      category: 'Ambiente',
      imageUrl: slots.theke.currentUrl,
      alt: slots.theke.alt,
    },
    {
      id: 'photo-erdbeerbecher',
      title: slots.erdbeerbecher.title,
      category: 'Eis',
      imageUrl: slots.erdbeerbecher.currentUrl,
      alt: slots.erdbeerbecher.alt,
    },
    {
      id: 'photo-kiwibecher',
      title: slots.kiwibecher.title,
      category: 'Eis',
      imageUrl: slots.kiwibecher.currentUrl,
      alt: slots.kiwibecher.alt,
    },
    {
      id: 'photo-latte',
      title: slots.lattemacchiato.title,
      category: 'Kaffee & Kuchen',
      imageUrl: slots.lattemacchiato.currentUrl,
      alt: slots.lattemacchiato.alt,
    },
    {
      id: 'photo-windbeutel',
      title: slots.windbeutel.title,
      category: 'Kuchen',
      imageUrl: slots.windbeutel.currentUrl,
      alt: slots.windbeutel.alt,
    },
  ];

  const allPhotos = [...customPhotos, ...slotPhotos];

  return (
    <section id="galerie" className="py-16 sm:py-24 bg-[#f4efe8]/50 border-t border-[#eeeae4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
              <Camera className="w-3.5 h-3.5" />
              Eindrücke & Impressionen
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
              Bildergalerie
            </h2>
            <p className="mt-2 text-base text-[#6e6359] max-w-2xl">
              Originale Eindrücke aus dem Eiscafé Ambiente in der Kurzackerstraße: Theke, hausgemachte Eisbecher, Kuchen und Kaffeespezialitäten.
            </p>
          </div>

          {/* Action button: Google Maps Photos */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={CAFE_DATA.googleMapsPhotosUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4a3728] bg-white hover:bg-[#fdfbf7] px-3.5 py-2 rounded-xl border border-[#ddd6cd] shadow-2xs transition-colors"
              title="Fotos und Rezensionen direkt auf Google Maps ansehen"
            >
              <Camera className="w-3.5 h-3.5 text-[#8b7e74]" />
              <span>Fotos auf Google Maps ansehen</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Responsive Image Grid: 5 authentic photos in balanced layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {allPhotos.map((photo) => {
            const isCustom = photo.id.startsWith('custom-');
            const isWide = photo.id === 'photo-theke';
            return (
              <button
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className={`group relative rounded-xl overflow-hidden border border-[#eeeae4] bg-[#eeeae4] focus:outline-hidden focus:ring-2 focus:ring-[#4a3728] text-left cursor-pointer transition-all duration-300 shadow-xs hover:shadow-md ${
                  isWide ? 'md:col-span-2 aspect-16/10 sm:aspect-16/9 md:aspect-auto min-h-[220px] sm:min-h-[260px]' : 'aspect-4/3 sm:aspect-square'
                }`}
                aria-label={`Bild vergrößern: ${photo.title}`}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.alt}
                  className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Badge for custom uploaded photos */}
                {isCustom && (
                  <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md bg-[#4a3728]/90 text-[10px] font-semibold text-white backdrop-blur-xs shadow-xs">
                    Original
                  </span>
                )}

                {/* Delete button for custom uploaded photos */}
                {isCustom && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCustomPhoto(photo.id, e)}
                    className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors"
                    title="Foto entfernen"
                    aria-label="Foto entfernen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Overlay on hover / touch feedback */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 sm:p-4">
                  <span className="text-[11px] font-medium text-[#eeeae4] uppercase tracking-wider">
                    {photo.category}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white truncate">
                    {photo.title}
                  </span>
                  <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/30 backdrop-blur-xs text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b7e74] border-t border-[#eeeae4] pt-4">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#4a3728] shrink-0" />
            <span>Tippe auf ein Foto für die Vollbild-Ansicht. Alle Aufnahmen sind echte Fotografien.</span>
          </div>
          <a
            href={CAFE_DATA.googleMapsPhotosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a3728] font-medium hover:underline inline-flex items-center gap-1 shrink-0"
          >
            Aktuelle Gäste-Fotos auf Google Maps ansehen →
          </a>
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
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors focus:outline-hidden focus:ring-2 focus:ring-white cursor-pointer"
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
