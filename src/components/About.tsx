import React from 'react';
import { Heart, Coffee, Sparkles, MapPin } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';
import { useCafeImages } from '../context/CafeImageContext';

export const About: React.FC = () => {
  const { getImageUrl, getImageAlt } = useCafeImages();

  return (
    <section id="ueber-uns" className="py-16 sm:py-24 bg-[#f4efe8]/50 border-y border-[#eeeae4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual column: authentic café warmth */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-xl overflow-hidden shadow-sm border border-[#eeeae4] bg-white">
                <img
                  src={getImageUrl('theke')}
                  alt={getImageAlt('theke')}
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Secondary inset photo */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 w-44 sm:w-52 rounded-xl overflow-hidden shadow-md border-2 border-white hidden sm:block">
                <img
                  src={getImageUrl('lattemacchiato')}
                  alt={getImageAlt('lattemacchiato')}
                  className="w-full h-32 sm:h-36 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Small location tag pill */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-xs text-xs font-medium text-[#4a3728] flex items-center gap-1.5 border border-[#eeeae4]">
                <MapPin className="w-3.5 h-3.5 text-[#4a3728]" />
                Kurzackerstraße 10
              </div>
            </div>
          </div>

          {/* Text column: authentic and personal */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-w-xl lg:max-w-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-4">
                <Heart className="w-3.5 h-3.5 text-[#4a3728]" />
                Herzlich willkommen
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
                Willkommen im Eiscafé Ambiente
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-[#6e6359] leading-relaxed">
                <p>
                  Im Herzen von Pößneck ist das <strong>Eiscafé Ambiente</strong> mehr als nur eine Eisdiele – es ist ein Ort zum Ankommen, Innehalten und Durchatmen. In der Kurzackerstraße gelegen, laden wir dich ein, den Alltag für einen Augenblick hinter dir zu lassen.
                </p>

                <p>
                  Ob du Lust auf herrlich cremiges Eis hast, eine aromatische Tasse Kaffee schätzt oder dich mit feinen Kuchen und süßen Köstlichkeiten verwöhnen möchtest: Bei uns findest du die passende Auszeit für jeden Nachmittag.
                </p>

                <p>
                  Wir legen großen Wert auf eine gemütliche Atmosphäre, in der sich Jung und Alt gleichermaßen willkommen fühlen. Nimm dir einen Tisch, triff Freunde oder Familie und genieße eine herzliche, angenehme Bedienung in ruhiger Thüringer Nachbarschaft.
                </p>
              </div>

              {/* Three value pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#eeeae4]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#eeeae4] text-[#4a3728] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] text-sm">Gemütlich</h3>
                    <p className="text-xs text-[#8b7e74] mt-0.5">Zum Sitzen, Verweilen und Genießen in Pößneck.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#eeeae4] text-[#4a3728] shrink-0">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] text-sm">Kaffee & Süßes</h3>
                    <p className="text-xs text-[#8b7e74] mt-0.5">Feine Kaffeespezialitäten und Kuchen.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#eeeae4] text-[#4a3728] shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#2d2d2d] text-sm">Herzlich</h3>
                    <p className="text-xs text-[#8b7e74] mt-0.5">Freundlicher Service für jeden Gast.</p>
                  </div>
                </div>
              </div>

              {/* CTA link to opening hours */}
              <div className="mt-8">
                <a
                  href="#oeffnungszeiten"
                  className="inline-flex items-center text-sm font-medium text-[#4a3728] hover:text-[#3a2c20] transition-colors gap-1.5"
                >
                  <span>Öffnungszeiten und Ruhetage ansehen</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
