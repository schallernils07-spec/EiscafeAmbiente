import React from 'react';
import { Navigation, Sparkles, MapPin, Phone } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';

export const CallToAction: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#fdfbf7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-[#4a3728] text-white p-8 sm:p-14 md:p-16 shadow-lg border border-[#3a2c20] text-center">
          {/* Subtle warm decorative glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#2d2118]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-white/10 text-[#eeeae4] border border-white/15 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#eeeae4]" />
              Auszeit in Pößneck
            </div>

            {/* Requested CTA Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-white tracking-tight">
              Lust auf Eis?
            </h2>

            {/* Requested Tagline */}
            <p className="mt-5 text-lg sm:text-xl text-[#eeeae4]/90 leading-relaxed">
              Besuche das Eiscafé Ambiente in Pößneck und gönn dir eine gemütliche Auszeit.
            </p>

            {/* Requested Button: Route planen */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CAFE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#fdfbf7] hover:bg-[#eeeae4] text-[#4a3728] font-semibold text-base shadow-sm hover:shadow-md transition-all active:scale-98"
                id="cta-route-button"
              >
                <Navigation className="w-5 h-5 text-[#4a3728]" />
                <span>Route planen</span>
              </a>

              <a
                href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-xs transition-all active:scale-98"
              >
                <Phone className="w-4 h-4 text-[#eeeae4]" />
                <span>{CAFE_DATA.phones.landline}</span>
              </a>
            </div>

            {/* Location reassurance */}
            <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-center gap-2 text-xs sm:text-sm text-[#eeeae4]/80">
              <MapPin className="w-4 h-4 text-[#eeeae4]" />
              <span>Kurzackerstraße 10, 07381 Pößneck, Thüringen</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
