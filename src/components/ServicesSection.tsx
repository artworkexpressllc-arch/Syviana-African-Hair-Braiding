import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES, ServiceItem } from '../config/business';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-[#F7F6F3] text-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with elegant gold lines */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="h-[2px] w-12 sm:w-20 bg-[#D6A52B]" />
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Our Services
            </h2>
            <span className="h-[2px] w-12 sm:w-20 bg-[#D6A52B]" />
          </div>
          <p className="text-neutral-600 text-base leading-relaxed">
            Expert African hair braiding styles crafted with care, precision, and protective
            techniques. Click <span className="font-semibold text-neutral-900">"Request This Style"</span> to
            fill your appointment details.
          </p>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-[#D6A52B] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Hairstyle Photo with Zoom Effect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={service.image}
                    alt={`${service.name} at Syviana Africa Hair Braiding Chicago`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-[#F2D27A] text-xs font-semibold px-2.5 py-1 rounded-full">
                    {service.category}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-serif-luxury text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#9A6F00] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => onSelectService(service.name)}
                  className="w-full bg-neutral-900 text-white hover:bg-[#D6A52B] hover:text-black font-semibold text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
                  aria-label={`Request ${service.name} style`}
                >
                  <Sparkles className="w-4 h-4 text-[#D6A52B] group-hover:text-black" />
                  <span>Request This Style</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Custom Consultations & Pricing */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-neutral-200 text-center max-w-3xl mx-auto shadow-xs">
          <p className="text-neutral-700 text-sm leading-relaxed">
            <strong className="text-neutral-900">Custom Lengths & Textures:</strong> Prices and
            timings vary based on desired length (shoulder, mid-back, waist, butt-length), hair
            thickness, and parting style. Our stylists will verify the exact price with you during
            appointment confirmation!
          </p>
        </div>
      </div>
    </section>
  );
};
