/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Phone, Navigation, ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Offerings } from './components/Offerings';
import { Gallery } from './components/Gallery';
import { OpeningHours } from './components/OpeningHours';
import { LocationMap } from './components/LocationMap';
import { Contact } from './components/Contact';
import { Reviews } from './components/Reviews';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { CafeImageProvider } from './context/CafeImageContext';
import { CAFE_DATA } from './data/cafeData';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CafeImageProvider>
      <div className="min-h-screen bg-[#fdfbf7] text-[#2d2d2d] flex flex-col selection:bg-[#eeeae4] selection:text-[#4a3728]">
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero */}
          <Hero />

        {/* 2. Über uns */}
        <About />

        {/* 3. Eis & Genuss */}
        <Offerings />

        {/* 4. Galerie */}
        <Gallery />

        {/* 5. Öffnungszeiten */}
        <OpeningHours />

        {/* 6. Standort */}
        <LocationMap />

        {/* 7. Kontakt */}
        <Contact />

        {/* 8. Bewertungen */}
        <Reviews />

        {/* 9. Call-to-Action */}
        <CallToAction />
      </main>

      {/* 10. Footer with Impressum & Datenschutz */}
      <Footer />

      {/* Mobile Quick Action Floating Bar (bottom sticky on small screens) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40 flex items-center gap-2 bg-[#4a3728]/95 backdrop-blur-md p-2 rounded-full shadow-xl border border-white/15">
        <a
          href={`tel:${CAFE_DATA.phones.landlineRaw}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-white text-[#4a3728] text-xs font-bold shadow-xs active:scale-95 transition-transform hover:bg-[#fdfbf7]"
        >
          <Phone className="w-3.5 h-3.5 text-[#4a3728]" />
          <span>Jetzt anrufen</span>
        </a>
        <a
          href={CAFE_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-full bg-white/15 text-[#fdfbf7] text-xs font-medium border border-white/20 active:scale-95 transition-transform"
        >
          <Navigation className="w-3.5 h-3.5 text-white" />
          <span>Route planen</span>
        </a>
      </div>

      {/* Scroll to Top Button for desktop */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden sm:flex fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#4a3728] hover:bg-[#3a2c20] text-white shadow-lg transition-all active:scale-95 cursor-pointer border border-[#eeeae4]"
          aria-label="Nach oben scrollen"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
    </CafeImageProvider>
  );
}

