import React from 'react';
import { Star, ShieldCheck, ThumbsUp, Heart, ExternalLink } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';

export const Reviews: React.FC = () => {
  return (
    <section id="bewertungen" className="py-16 sm:py-24 bg-[#f4efe8]/50 border-t border-[#eeeae4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4a3728]" />
            Gästemeinung & Vertrauen
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
            Von Gästen geschätzt
          </h2>

          <p className="mt-3 text-base text-[#6e6359] max-w-xl mx-auto">
            Zufriedene Gäste in Pößneck schätzen das gemütliche Ambiente, das leckere Eis und die herzliche Bedienung.
          </p>

          {/* Rating Display Card */}
          <div className="mt-10 bg-white rounded-2xl p-8 sm:p-12 border border-[#eeeae4] shadow-xs relative overflow-hidden">
            <div className="flex flex-col items-center">
              {/* Stars display */}
              <div className="flex items-center gap-1.5 text-[#c28e46] mb-3">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-7 h-7 sm:w-8 sm:h-8 fill-[#c28e46]" />
                ))}
                {/* Fractional 5th star */}
                <div className="relative">
                  <Star className="w-7 h-7 sm:w-8 sm:h-8 text-[#eeeae4] fill-[#eeeae4]" />
                  <div className="absolute inset-0 overflow-hidden w-[40%]">
                    <Star className="w-7 h-7 sm:w-8 sm:h-8 fill-[#c28e46] text-[#c28e46]" />
                  </div>
                </div>
              </div>

              {/* Big Score: 4,2 / 5 */}
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
                  4,2
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-[#8b7e74]">
                  / 5
                </span>
              </div>

              {/* Source label */}
              <p className="mt-2 text-base sm:text-lg font-medium text-[#6e6359]">
                Bewertung auf Google
              </p>

              {/* Honest trust explanation */}
              <p className="mt-4 text-xs sm:text-sm text-[#8b7e74] max-w-md leading-relaxed">
                Echtes Feedback von Besuchern des Eiscafé Ambiente in Pößneck. Wir danken allen Gästen für das Vertrauen und die Weiterempfehlungen.
              </p>

              {/* Feedback highlights: no fake names/quotes, but honest highlights reported by visitors */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full pt-6 border-t border-[#eeeae4]">
                <div className="p-3.5 rounded-xl bg-[#fdfbf7] text-center border border-[#eeeae4]">
                  <ThumbsUp className="w-4 h-4 mx-auto text-[#4a3728] mb-1.5" />
                  <p className="text-xs font-semibold text-[#2d2d2d]">Leckeres Eis</p>
                  <p className="text-[11px] text-[#8b7e74] mt-0.5">Frisch & cremig</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fdfbf7] text-center border border-[#eeeae4]">
                  <Heart className="w-4 h-4 mx-auto text-[#4a3728] mb-1.5" />
                  <p className="text-xs font-semibold text-[#2d2d2d]">Gemütliche Atmosphäre</p>
                  <p className="text-[11px] text-[#8b7e74] mt-0.5">Zum Wohlfühlen</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#fdfbf7] text-center border border-[#eeeae4]">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#4a3728] mb-1.5" />
                  <p className="text-xs font-semibold text-[#2d2d2d]">Angenehme Bedienung</p>
                  <p className="text-[11px] text-[#8b7e74] mt-0.5">Herzlich & aufmerksam</p>
                </div>
              </div>

              {/* External Link */}
              <div className="mt-8">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Eiscaf%C3%A9+Ambiente+P%C3%B6%C3%9Fneck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#eeeae4] text-xs sm:text-sm font-medium text-[#4a3728] hover:bg-[#f4efe8] hover:border-[#4a3728] transition-colors"
                >
                  <span>Rezensionen direkt auf Google ansehen</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#4a3728]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
