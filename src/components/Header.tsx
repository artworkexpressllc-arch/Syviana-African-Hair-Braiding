import React, { useState } from 'react';
import { Phone, MapPin, Instagram, Facebook, Calendar, Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top Black Info Bar */}
      <div className="bg-[#0B0B0B] text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-6">
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-[#D6A52B] transition-colors"
              aria-label={`Call us at ${BUSINESS_CONFIG.phoneDisplay}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#D6A52B]" />
              <span className="font-medium tracking-wide">{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <a
              href={BUSINESS_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 hover:text-[#D6A52B] transition-colors"
              aria-label={`Visit us at ${BUSINESS_CONFIG.address.full}`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#D6A52B]" />
              <span>{BUSINESS_CONFIG.address.full}</span>
            </a>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <a
              href={BUSINESS_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#D6A52B] transition-colors"
              aria-label="Visit Syviana Africa Hair Braiding on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={BUSINESS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-[#D6A52B] transition-colors"
              aria-label="Visit Syviana Africa Hair Braiding on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main White Navigation Bar */}
      <div className="bg-white text-neutral-900 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-[#D6A52B] rounded"
          >
            <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/logo-icon.webp"
                alt="Syviana Africa Hair Braiding Logo"
                className="w-full h-full object-contain filter drop-shadow-sm"
                onError={(e) => {
                  // Fallback vector icon if image fails to render
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif-luxury text-xl font-bold tracking-tight text-neutral-950 group-hover:text-[#9A6F00] transition-colors">
                Syviana Africa
              </span>
              <span className="font-serif italic text-sm font-semibold text-[#D6A52B] tracking-wide">
                Hair Braiding
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-semibold text-neutral-800 hover:text-[#B8861C] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#D6A52B]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Book Appointment CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onBookClick}
              className="gold-gradient-bg text-neutral-950 font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:brightness-105 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 text-base font-semibold text-neutral-800 hover:text-[#B8861C] border-b border-neutral-100"
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="w-full gold-gradient-bg text-neutral-950 font-bold text-base py-3 px-4 rounded-xl shadow flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Request</span>
                  <span>→</span>
                </button>

                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="w-full bg-neutral-900 text-white font-medium text-center py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#D6A52B]" />
                  <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
