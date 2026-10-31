import React from 'react';
import { Phone, MapPin, Clock, ExternalLink, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const LocationContactSection: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-[#F7F6F3] text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-4 mb-2">
            <span className="h-[2px] w-12 bg-[#D6A52B]" />
            <h2 className="font-serif-luxury text-3xl font-bold tracking-tight text-neutral-900">
              Visit Our Salon
            </h2>
            <span className="h-[2px] w-12 bg-[#D6A52B]" />
          </div>
          <p className="text-sm text-neutral-600">
            Conveniently located in Chicago, IL. Easy street parking and public transit access.
          </p>
        </div>

        {/* 3-Column Info Card matching Mockup */}
        <div className="bg-white rounded-3xl shadow-xl border border-neutral-200/80 p-8 sm:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {/* Column 1: Call Us */}
            <div className="flex items-center gap-5 pt-4 md:pt-0 md:pr-6">
              <div className="w-14 h-14 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Phone className="w-6 h-6 text-[#D6A52B]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                  Call Us
                </span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="text-lg sm:text-xl font-bold text-neutral-900 hover:text-[#9A6F00] transition-colors block mt-0.5"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
                <span className="text-xs text-neutral-500">Tap to call or text</span>
              </div>
            </div>

            {/* Column 2: Our Location */}
            <div className="flex items-center gap-5 pt-8 md:pt-0 md:px-6">
              <div className="w-14 h-14 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <MapPin className="w-6 h-6 text-[#D6A52B]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                  Our Location
                </span>
                <p className="text-sm sm:text-base font-bold text-neutral-900 mt-0.5 leading-snug">
                  {BUSINESS_CONFIG.address.street}
                  <br />
                  <span className="font-normal text-neutral-600 text-xs">
                    {BUSINESS_CONFIG.address.city}, {BUSINESS_CONFIG.address.state} {BUSINESS_CONFIG.address.zip}
                  </span>
                </p>
                <a
                  href={BUSINESS_CONFIG.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#9A6F00] hover:text-black transition-colors inline-flex items-center gap-1 mt-1 underline"
                >
                  <span>Get Directions</span>
                  <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            {/* Column 3: Business Hours */}
            <div className="flex items-center gap-5 pt-8 md:pt-0 md:pl-6">
              <div className="w-14 h-14 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                <Clock className="w-6 h-6 text-[#D6A52B]" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-500 block">
                  Business Hours
                </span>
                <span className="text-lg sm:text-xl font-bold text-neutral-900 block mt-0.5">
                  {BUSINESS_CONFIG.hours.display}
                </span>
                <span className="text-xs text-neutral-500">{BUSINESS_CONFIG.hours.days}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map & Neighborhood Context */}
        <div className="rounded-3xl overflow-hidden border border-neutral-300 shadow-md bg-neutral-900 relative">
          <div className="p-6 bg-neutral-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800">
            <div>
              <h3 className="font-serif-luxury font-bold text-lg text-white">
                Syviana Africa Hair Braiding Salon Location
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Located on 79th Street in Chicago. Ample parking available near the salon.
              </p>
            </div>
            <a
              href={BUSINESS_CONFIG.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-gradient-bg text-black text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 hover:brightness-105 transition-all shadow"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Map iframe */}
          <div className="w-full h-80 bg-neutral-800 relative">
            <iframe
              title="Syviana Africa Hair Braiding Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=3773+W+79th+St,+Chicago,+IL+60652&t=&z=15&ie=UTF8&iwloc=&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
