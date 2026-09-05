import React, { useState, useEffect } from 'react';
import { Phone, Navigation, Clock, Menu, X } from 'lucide-react';
import { CAFE_DATA, getOpeningStatus } from '../data/cafeData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const status = getOpeningStatus();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Über uns', href: '#ueber-uns' },
    { name: 'Genuss', href: '#genuss' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Öffnungszeiten', href: '#oeffnungszeiten' },
    { name: 'Standort', href: '#standort' },
    { name: 'Kontakt', href: '#kontakt' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fdfbf7]/95 backdrop-blur-md shadow-xs border-b border-[#eeeae4] py-3'
          : 'bg-[#fdfbf7]/85 backdrop-blur-xs border-b border-[#eeeae4]/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group flex flex-col items-start focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4a3728] rounded-xs"
            aria-label="Eiscafé Ambiente Startseite"
          >
            <span className="font-serif-title tracking-[0.22em] text-xl sm:text-2xl font-bold text-[#2d2d2d] group-hover:text-[#4a3728] transition-colors uppercase">
              Ambiente
            </span>
            <span className="text-[11px] sm:text-xs font-medium tracking-wider text-[#8b7e74] uppercase">
              Eiscafé · Pößneck
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-[#5c5248] hover:text-[#4a3728] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#4a3728] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Header Actions & Quick Info */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Status indicator pill */}
            <a
              href="#oeffnungszeiten"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                status.isOpenRightNow
                  ? 'bg-[#eef5ed] text-[#2d5f30] border-[#d2e3d3]'
                  : status.isTodayOpen
                  ? 'bg-[#f4efe8] text-[#635547] border-[#e5ddd3]'
                  : 'bg-[#faeded] text-[#823535] border-[#f0d4d4]'
              }`}
              title={status.statusSubtext}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpenRightNow ? 'bg-[#2d5f30] animate-pulse' : 'bg-[#8b7e74]'
                }`}
              />
              <Clock className="w-3.5 h-3.5" />
              <span>{status.statusBadge}</span>
            </a>

            {/* Direct Call Button */}
            <a
              href={`tel:${CAFE_DATA.phones.landlineRaw}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a3728] hover:bg-[#3a2c20] text-white text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-98"
              aria-label="Eiscafé Ambiente anrufen"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{CAFE_DATA.phones.landline}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={`tel:${CAFE_DATA.phones.landlineRaw}`}
              className="p-2 rounded-full bg-[#4a3728] text-white hover:bg-[#3a2c20] transition-colors"
              aria-label="Anrufen"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2d2d2d] hover:bg-[#eeeae4] transition-colors focus:outline-hidden focus:ring-2 focus:ring-[#4a3728]"
              aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#fdfbf7] border-b border-[#eeeae4] px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className="text-base font-medium text-[#2d2d2d] hover:text-[#4a3728] px-3 py-2 rounded-md hover:bg-[#eeeae4] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-[#eeeae4] flex flex-col gap-2.5">
              <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#635547] bg-[#f4efe8] rounded-lg">
                <span
                  className={`w-2 h-2 rounded-full ${
                    status.isOpenRightNow ? 'bg-[#2d5f30]' : 'bg-[#823535]'
                  }`}
                />
                <span>{status.statusHeadline}: {status.todaySchedule.displayHours}</span>
              </div>

              <a
                href={CAFE_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleNavClick}
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg bg-[#4a3728] text-white text-sm font-medium hover:bg-[#3a2c20] transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Route planen
              </a>

              <a
                href={`tel:${CAFE_DATA.phones.landlineRaw}`}
                onClick={handleNavClick}
                className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg border border-[#eeeae4] text-[#4a3728] bg-white text-sm font-medium hover:bg-[#f4efe8] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen ({CAFE_DATA.phones.landline})
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
