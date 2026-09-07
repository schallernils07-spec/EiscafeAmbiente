import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Camera } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CAFE_DATA.address.fullFormatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="standort" className="py-16 sm:py-24 bg-[#f4efe8]/50 border-t border-[#eeeae4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#4a3728]" />
            Anfahrt & Lage
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
            Hier findest du uns
          </h2>
          <p className="mt-2 text-base text-[#6e6359]">
            Mitten in Pößneck – gut erreichbar zu Fuß, mit dem Rad oder mit dem Auto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Address Details Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-2xl p-8 border border-[#eeeae4] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#f4efe8] text-[#4a3728] flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-serif-title font-bold text-[#2d2d2d]">
                Eiscafé Ambiente
              </h3>

              <div className="mt-4 p-4 rounded-xl bg-[#fdfbf7] border border-[#eeeae4]">
                <p className="text-xs uppercase tracking-wider font-medium text-[#8b7e74] mb-1">
                  Adresse
                </p>
                <p className="text-xl font-medium text-[#2d2d2d]">
                  {CAFE_DATA.address.street}
                </p>
                <p className="text-xl font-medium text-[#2d2d2d]">
                  {CAFE_DATA.address.zip} {CAFE_DATA.address.city}
                </p>
                <p className="text-sm text-[#8b7e74] mt-1">
                  {CAFE_DATA.address.state}, Deutschland
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={CAFE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#4a3728] hover:bg-[#3a2c20] text-white font-medium text-base shadow-xs hover:shadow-md transition-all active:scale-98"
                  id="map-route-button"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Route planen</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f4efe8] hover:bg-[#eeeae4] text-[#4a3728] text-sm font-medium border border-[#eeeae4] transition-colors cursor-pointer"
                  aria-label="Adresse kopieren"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2d5f30]" />
                      <span className="text-[#2d5f30] font-medium">Adresse in die Zwischenablage kopiert!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#8b7e74]" />
                      <span>Adresse kopieren</span>
                    </>
                  )}
                </button>

                <a
                  href={CAFE_DATA.googleMapsPhotosUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#fdfbf7] text-[#4a3728] text-sm font-medium border border-[#ddd6cd] transition-colors"
                  aria-label="Standortfotos und Rezensionen auf Google Maps ansehen"
                >
                  <Camera className="w-4 h-4 text-[#8b7e74]" />
                  <span>Fotos & Rezensionen auf Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                </a>
              </div>

              {/* Quick hints */}
              <div className="mt-6 pt-5 border-t border-[#eeeae4] space-y-2 text-xs text-[#8b7e74]">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a3728]" />
                  Ruhige Lage in der Kurzackerstraße in Pößneck
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4a3728]" />
                  Ideal für einen Ausflug oder den gemütlichen Nachmittagsbesuch
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#eeeae4] shadow-xs bg-white">
              {/* Top bar simulating a neat navigation container */}
              <div className="bg-[#fdfbf7] px-5 py-3 border-b border-[#eeeae4] flex items-center justify-between text-xs text-[#6e6359]">
                <div className="flex items-center gap-2 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4a3728]" />
                  <span>Google Maps: Kurzackerstraße 10, Pößneck</span>
                </div>
                <a
                  href={CAFE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4a3728] font-medium transition-colors flex items-center gap-1"
                >
                  Große Karte öffnen
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Google Maps Embed with pointer fallback */}
              <div className="relative h-80 sm:h-96 w-full bg-[#eeeae4]">
                <iframe
                  title="Standort Eiscafé Ambiente Pößneck"
                  src={CAFE_DATA.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Footer strip below map */}
              <div className="p-4 bg-white border-t border-[#eeeae4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8b7e74]">
                <span>Ziel: Eiscafé Ambiente, Kurzackerstraße 10, 07381 Pößneck</span>
                <a
                  href={CAFE_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4a3728] font-medium hover:underline"
                >
                  Navigation sofort starten →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
