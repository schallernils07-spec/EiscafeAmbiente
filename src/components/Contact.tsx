import React from 'react';
import { Phone, Smartphone, MessageCircle, Clock, MapPin } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';

export const Contact: React.FC = () => {
  return (
    <section id="kontakt" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium uppercase tracking-wider bg-[#eeeae4] text-[#4a3728] mb-3">
              <Phone className="w-3.5 h-3.5" />
              Direkter Kontakt
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#2d2d2d] tracking-tight">
              Kontakt aufnehmen
            </h2>
            <p className="mt-2 text-base text-[#6e6359]">
              Du hast Fragen zu Öffnungszeiten, Tischreservierungen oder möchtest uns anrufen? Wir sind gerne für dich da.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Festnetz Card */}
            <div className="bg-white rounded-2xl p-7 border border-[#eeeae4] shadow-xs flex flex-col justify-between hover:border-[#4a3728] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4efe8] text-[#4a3728] flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4efe8] text-[#4a3728] border border-[#eeeae4]">
                    Festnetz
                  </span>
                </div>

                <p className="text-sm font-medium text-[#8b7e74]">Telefonnummer</p>
                <a
                  href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                  className="mt-1 block text-2xl sm:text-3xl font-serif-title font-bold text-[#2d2d2d] hover:text-[#4a3728] transition-colors"
                >
                  {CAFE_DATA.phones.landline}
                </a>
                <p className="mt-2 text-xs text-[#8b7e74]">
                  Erreichbar zu den Café-Öffnungszeiten in Pößneck.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#eeeae4]">
                <a
                  href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#4a3728] hover:bg-[#3a2c20] text-white font-medium text-base shadow-xs hover:shadow-md transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4" />
                  <span>Jetzt anrufen</span>
                </a>
              </div>
            </div>

            {/* Mobil Card */}
            <div className="bg-white rounded-2xl p-7 border border-[#eeeae4] shadow-xs flex flex-col justify-between hover:border-[#4a3728] transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f4efe8] text-[#4a3728] flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#f4efe8] text-[#4a3728] border border-[#eeeae4]">
                    Mobil
                  </span>
                </div>

                <p className="text-sm font-medium text-[#8b7e74]">Mobilnummer</p>
                <a
                  href={`tel:${CAFE_DATA.phones.mobileRaw}`}
                  className="mt-1 block text-2xl sm:text-3xl font-serif-title font-bold text-[#2d2d2d] hover:text-[#4a3728] transition-colors"
                >
                  {CAFE_DATA.phones.mobile}
                </a>
                <p className="mt-2 text-xs text-[#8b7e74]">
                  Direkte Mobilnummer für Rückfragen.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#eeeae4]">
                <a
                  href={`tel:${CAFE_DATA.phones.mobileRaw}`}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white hover:bg-[#f4efe8] text-[#4a3728] font-medium text-base border border-[#eeeae4] shadow-xs hover:border-[#4a3728] transition-all active:scale-98"
                >
                  <Phone className="w-4 h-4 text-[#4a3728]" />
                  <span>Mobil anrufen</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick info banner underneath */}
          <div className="mt-8 bg-[#f4efe8] rounded-xl p-5 sm:p-6 border border-[#eeeae4] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white text-[#4a3728] shadow-2xs">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#2d2d2d]">Öffnungszeiten beachten</p>
                <p className="text-xs text-[#6e6359]">Dienstag bis Sonntag jeweils von 13:00 bis 17:30 Uhr (Montag Ruhetag)</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4a3728]" />
              <span className="text-xs sm:text-sm font-medium text-[#4a3728]">Kurzackerstraße 10, 07381 Pößneck</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
