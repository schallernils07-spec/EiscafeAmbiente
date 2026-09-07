import React from 'react';
import { Navigation, Phone, MapPin, Star, Clock, Coffee } from 'lucide-react';
import { CAFE_DATA, getOpeningStatus } from '../data/cafeData';
import { useCafeImages } from '../context/CafeImageContext';

export const Hero: React.FC = () => {
  const status = getOpeningStatus();
  const { getImageUrl, getImageAlt } = useCafeImages();

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden" id="start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Text Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Trust Badges & Local Pill */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#eeeae4] text-[#4a3728] border border-[#ddd6cd]">
                <MapPin className="w-3.5 h-3.5 text-[#4a3728]" />
                Pößneck, Thüringen
              </span>
              <a
                href="#bewertungen"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white text-[#4a3728] border border-[#eeeae4] hover:border-[#4a3728] transition-colors shadow-xs"
              >
                <div className="flex items-center text-[#c28e46]">
                  <Star className="w-3.5 h-3.5 fill-[#c28e46]" />
                </div>
                <span>4,2 / 5 auf Google</span>
              </a>
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                  status.isOpenRightNow
                    ? 'bg-[#eef5ed] text-[#2d5f30] border-[#d2e3d3]'
                    : status.isTodayOpen
                    ? 'bg-[#f4efe8] text-[#635547] border-[#e5ddd3]'
                    : 'bg-[#faeded] text-[#823535] border-[#f0d4d4]'
                }`}
              >
                <Clock className="w-3 h-3" />
                {status.statusHeadline}
              </span>
            </div>

            {/* Main Brand Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-[#2d2d2d] tracking-tight leading-[1.12]">
              Eiscafé Ambiente
            </h1>

            {/* Emotional Tagline */}
            <p className="mt-4 text-xl sm:text-2xl font-serif text-[#4a3728] italic leading-snug">
              „Eis, Kaffee & gemütliche Momente in Pößneck.“
            </p>

            {/* Atmospheric Intro Note */}
            <p className="mt-4 text-base sm:text-lg text-[#6e6359] leading-relaxed max-w-xl">
              Dein Treffpunkt für handwerklich zubereitetes Eis, duftenden Kaffee und eine entspannte
              Pause in herzlicher Atmosphäre. Besuche uns in der Kurzackerstraße und nimm dir Zeit zum Genießen.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <a
                href={CAFE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4a3728] hover:bg-[#3a2c20] text-white font-medium text-base shadow-xs hover:shadow-md transition-all active:scale-98"
                id="hero-route-button"
              >
                <Navigation className="w-4 h-4" />
                <span>Route planen</span>
              </a>

              <a
                href="#kontakt"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#f4efe8] text-[#4a3728] font-medium text-base border border-[#eeeae4] shadow-xs hover:border-[#4a3728] transition-all active:scale-98"
                id="hero-contact-button"
              >
                <Phone className="w-4 h-4 text-[#4a3728]" />
                <span>Kontakt aufnehmen</span>
              </a>
            </div>

            {/* Micro Details */}
            <div className="mt-8 pt-6 border-t border-[#eeeae4] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-[#8b7e74]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4a3728]" />
                <span>Kurzackerstraße 10, 07381 Pößneck</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4a3728]" />
                <span>Di – So: 13:00 – 17:30 Uhr</span>
              </div>
            </div>
          </div>

          {/* Visual Hero Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xs border border-[#eeeae4] bg-white aspect-4/3 sm:aspect-5/4">
                <img
                  src={getImageUrl('erdbeerbecher')}
                  alt={getImageAlt('erdbeerbecher')}
                  className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Clean unobtrusive badge in the top right corner */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-medium text-[#4a3728] shadow-xs border border-[#eeeae4]">
                    Vor Ort & zum Mitnehmen
                  </span>
                </div>
              </div>

              {/* Informative highlight card in natural document flow below the image (no overlap) */}
              <div className="mt-4 p-4 rounded-xl bg-white border border-[#eeeae4] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#f4efe8] flex items-center justify-center text-[#4a3728] shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#8b7e74] truncate">Frisches Eis & Kaffeeduft</p>
                    <p className="text-sm font-semibold text-[#2d2d2d] truncate">Eisbecher, Kaffee & hausgemachte Kuchen</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex shrink-0 text-xs font-medium text-[#4a3728] bg-[#f4efe8] px-2.5 py-1 rounded-md border border-[#eeeae4]">
                  Pößneck
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
