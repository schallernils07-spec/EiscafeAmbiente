import React from 'react';
import { Sparkles } from 'lucide-react';
import { CAFE_OFFERINGS } from '../data/cafeData';

export const Offerings: React.FC = () => {
  return (
    <section id="genuss" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Unser Angebot
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
            Eis & Genuss im Ambiente
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#6e6359]">
            Klassische Eiskreationen, frisch gebrühter Kaffee und süße Köstlichkeiten für jeden Moment.
          </p>
        </div>

        {/* 3 requested cards: Eis, Kaffee, Kuchen & Süßes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {CAFE_OFFERINGS.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden border border-[#eeeae4] shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#f4efe8]">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif-title font-bold text-[#2d2d2d] group-hover:text-[#4a3728] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base text-[#6e6359] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#eeeae4] flex items-center justify-between text-xs text-[#8b7e74]">
                  <span className="font-medium">Frisch serviert</span>
                  <span className="text-[#4a3728] font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Vor Ort genießen →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about freshness and local feel */}
        <div className="mt-12 text-center text-xs sm:text-sm text-[#6e6359] max-w-xl mx-auto bg-[#f4efe8] p-4 rounded-xl border border-[#eeeae4]">
          <p>
            Tipp: Genieß dein Eis im gemütlichen Gastraum oder nutze den Straßenverkauf für einen entspannten Spaziergang durch Pößneck.
          </p>
        </div>
      </div>
    </section>
  );
};
