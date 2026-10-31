import React from 'react';
import { Phone, MapPin, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#booking' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-[#0B0B0B] text-neutral-400 text-sm border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top Row: Brand, Nav Links, Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-neutral-800/80">
          {/* Logo Branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <img
                src="/images/logo-icon.webp"
                alt="Syviana Africa Hair Braiding Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xl font-bold text-white tracking-tight">
                Syviana Africa
              </span>
              <span className="font-serif italic text-sm font-semibold text-[#D6A52B]">
                Hair Braiding
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-neutral-300">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.label}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="hover:text-[#F2D27A] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
                {idx < navLinks.length - 1 && (
                  <span className="text-neutral-700 hidden sm:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href={BUSINESS_CONFIG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#D6A52B] hover:text-black text-neutral-300 flex items-center justify-center transition-all shadow-sm"
              aria-label="Facebook page"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={BUSINESS_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-[#D6A52B] hover:text-black text-neutral-300 flex items-center justify-center transition-all shadow-sm"
              aria-label="Instagram profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Middle Quick Info: Address & Phone */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D6A52B]" />
            <span>{BUSINESS_CONFIG.address.full}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D6A52B]" />
            <a
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="text-white hover:text-[#D6A52B] font-semibold transition-colors"
            >
              {BUSINESS_CONFIG.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D6A52B]" />
            <span>Serving Chicago & Surrounding Suburbs</span>
          </div>
        </div>

        {/* Centered Decorative Line */}
        <div className="flex items-center justify-center py-2">
          <span className="h-[1px] w-32 bg-neutral-800" />
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-neutral-500 pt-4">
          <p>© {new Date().getFullYear()} Syviana Africa Hair Braiding. All Rights Reserved.</p>
          <p className="mt-1 text-[11px] text-neutral-600">
            Professional Hair Braiding in Chicago, IL. Appointment requests are subject to confirmation.
          </p>
        </div>
      </div>
    </footer>
  );
};
