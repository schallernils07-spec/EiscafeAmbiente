import React, { useState } from 'react';
import { MapPin, Phone, Clock, X, Heart, Shield, FileText } from 'lucide-react';
import { CAFE_DATA } from '../data/cafeData';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <footer className="bg-[#2d2d2d] text-[#eeeae4] pt-16 pb-12 border-t border-[#3d3d3d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Address Column */}
          <div className="md:col-span-4">
            <h3 className="font-serif-title tracking-[0.2em] text-2xl font-bold text-white uppercase">
              Ambiente
            </h3>
            <p className="text-xs font-medium tracking-wider text-[#bbb2a9] uppercase mt-0.5">
              Eiscafé · Pößneck
            </p>

            <p className="mt-4 text-sm text-[#ccc4bb] leading-relaxed">
              Dein lokales Eiscafé für frisches Eis, duftende Kaffeespezialitäten und gemütliche Momente in Pößneck.
            </p>

            <div className="mt-6 flex items-start gap-2.5 text-sm text-[#eeeae4]">
              <MapPin className="w-4 h-4 text-[#eeeae4] shrink-0 mt-1" />
              <div>
                <p className="font-medium text-white">{CAFE_DATA.name}</p>
                <p>{CAFE_DATA.address.street}</p>
                <p>{CAFE_DATA.address.zip} {CAFE_DATA.address.city}, {CAFE_DATA.address.state}</p>
              </div>
            </div>
          </div>

          {/* Opening Hours Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 text-base font-serif-title font-semibold text-white mb-4">
              <Clock className="w-4 h-4 text-[#eeeae4]" />
              <h4>Öffnungszeiten</h4>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-[#ccc4bb]">
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Montag</span>
                <span className="text-[#fca5a5] font-medium">geschlossen (Ruhetag)</span>
              </li>
              <li className="flex justify-between py-1 border-b border-white/5">
                <span>Dienstag – Sonntag</span>
                <span className="font-medium text-white">13:00 – 17:30 Uhr</span>
              </li>
            </ul>

            <p className="mt-4 text-xs text-[#9d948a]">
              Aktuell auffindbare Öffnungszeiten. Bitte beachte eventuelle saisonale Anpassungen.
            </p>
          </div>

          {/* Contact & Legal Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 text-base font-serif-title font-semibold text-white mb-4">
              <Phone className="w-4 h-4 text-[#eeeae4]" />
              <h4>Kontakt & Anfahrt</h4>
            </div>

            <div className="space-y-2 text-sm text-[#ccc4bb]">
              <p className="flex items-center justify-between">
                <span>Telefon:</span>
                <a
                  href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                  className="font-medium text-white hover:text-[#eeeae4] underline transition-colors"
                >
                  {CAFE_DATA.phones.landline}
                </a>
              </p>
              <p className="flex items-center justify-between">
                <span>Mobil:</span>
                <a
                  href={`tel:${CAFE_DATA.phones.mobileRaw}`}
                  className="font-medium text-white hover:text-[#eeeae4] underline transition-colors"
                >
                  {CAFE_DATA.phones.mobile}
                </a>
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setModalType('impressum')}
                className="text-xs text-[#bbb2a9] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Impressum
              </button>
              <span className="text-white/20">·</span>
              <button
                type="button"
                onClick={() => setModalType('datenschutz')}
                className="text-xs text-[#bbb2a9] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
              >
                Datenschutz
              </button>
              <span className="text-white/20">·</span>
              <a
                href={CAFE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#eeeae4] hover:underline"
              >
                Google Maps Route
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and signature */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9d948a] gap-4">
          <p>© {new Date().getFullYear()} Eiscafé Ambiente Pößneck. Alle Rechte vorbehalten.</p>
          <p className="flex items-center gap-1.5">
            <span>Eis, Kaffee & gemütliche Momente in Pößneck</span>
            <Heart className="w-3.5 h-3.5 text-[#eeeae4]" />
          </p>
        </div>
      </div>

      {/* Legal Modals: Impressum & Datenschutz */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalType(null)}
        >
          <div
            className="relative max-w-2xl w-full bg-white text-[#2d2d2d] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#eeeae4] my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#eeeae4] mb-6">
              <div className="flex items-center gap-2">
                {modalType === 'impressum' ? (
                  <FileText className="w-5 h-5 text-[#4a3728]" />
                ) : (
                  <Shield className="w-5 h-5 text-[#4a3728]" />
                )}
                <h3 className="text-2xl font-serif-title font-bold text-[#2d2d2d]">
                  {modalType === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}
                </h3>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-2 rounded-full hover:bg-[#f4efe8] text-[#6e6359] transition-colors"
                aria-label="Schließen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4 text-sm text-[#6e6359] leading-relaxed">
              {modalType === 'impressum' ? (
                <>
                  <div className="p-3 bg-[#f4efe8] border border-[#eeeae4] rounded-xl text-xs text-[#4a3728]">
                    <strong>Hinweis für den Betreiber des Eiscafé Ambiente:</strong> Bitte ergänze an dieser Stelle deine konkreten rechtlichen Angaben (Inhaber/Betreiber, Rechtsform, ggf. Steuernummer und Registereintrag).
                  </div>

                  <h4 className="font-bold text-base text-[#2d2d2d]">Angaben gemäß § 5 TMG</h4>
                  <p>
                    <strong>Eiscafé Ambiente</strong><br />
                    Kurzackerstraße 10<br />
                    07381 Pößneck<br />
                    Thüringen, Deutschland
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">Vertreten durch:</h4>
                  <p>[Name des Inhabers / der Inhaberin vom Eiscafé Ambiente hier eintragen]</p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">Kontakt</h4>
                  <p>
                    Telefon: 03647 445330<br />
                    Mobil: 0163 2124808<br />
                    E-Mail: [E-Mail-Adresse des Eiscafés hier eintragen]
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">Umsatzsteuer-ID:</h4>
                  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [Falls vorhanden hier angeben]</p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">EU-Streitschlichtung</h4>
                  <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                  </p>
                </>
              ) : (
                <>
                  <div className="p-3 bg-[#f4efe8] border border-[#eeeae4] rounded-xl text-xs text-[#4a3728]">
                    <strong>Hinweis für den Betreiber:</strong> Diese Datenschutzerklärung ist als transparenter, DSGVO-konformer Platzhalter vorbereitet. Bitte passe die Verantwortliche Stelle und Kontaktdaten an deine Geschäftsabläufe an.
                  </div>

                  <h4 className="font-bold text-base text-[#2d2d2d]">1. Datenschutz auf einen Blick</h4>
                  <p>
                    Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Website dient der reinen Information über das Eiscafé Ambiente in Pößneck. Es werden grundsätzlich keine personenbezogenen Daten ohne deine ausdrückliche Kontaktaufnahme erhoben.
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">2. Verantwortliche Stelle</h4>
                  <p>
                    Eiscafé Ambiente<br />
                    Kurzackerstraße 10<br />
                    07381 Pößneck<br />
                    Telefon: 03647 445330
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">3. Hosting & Bereitstellung der Website</h4>
                  <p>
                    Beim Aufrufen unserer Website erfasst der Webserver automatisch technische Server-Logfiles (z.B. Browsertyp, Betriebssystem, Uhrzeit des Zugriffs). Diese Daten sind technisch notwendig, um die Website fehlerfrei und sicher auszuliefern.
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">4. Externe Dienste (Google Maps)</h4>
                  <p>
                    Um den Standort in Pößneck anzuzeigen und die Routenplanung zu erleichtern, binden wir Karteninhalte von Google Maps ein bzw. verlinken dorthin. Bei Interaktion mit der Karte können Daten an Google übertragen werden. Weitere Informationen findest du in der Datenschutzerklärung von Google.
                  </p>

                  <h4 className="font-bold text-base text-[#2d2d2d]">5. Deine Rechte</h4>
                  <p>
                    Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie das Recht auf Berichtigung oder Löschung dieser Daten.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#eeeae4] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="px-5 py-2.5 rounded-full bg-[#4a3728] hover:bg-[#3a2c20] text-white text-sm font-medium transition-colors"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
