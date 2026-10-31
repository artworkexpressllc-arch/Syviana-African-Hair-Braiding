import React from 'react';
import { Calendar, Sparkles, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section id="home" className="relative bg-[#0B0B0B] text-white overflow-hidden border-b border-neutral-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D6A52B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B8861C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[580px] py-12 lg:py-16 gap-10">
          {/* Left Text Column (lg: 7 cols) */}
          <div className="lg:col-span-7 z-10 flex flex-col justify-center">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D6A52B] font-bold mb-4">
              <Sparkles className="w-4 h-4 text-[#F2D27A]" />
              <span>{BUSINESS_CONFIG.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-5">
              Syviana Africa <br />
              <span className="gold-gradient-text italic font-normal">Hair Braiding</span>
            </h1>

            {/* Supporting Headline */}
            <p className="text-xl sm:text-2xl font-semibold text-neutral-200 mb-4 tracking-tight">
              {BUSINESS_CONFIG.subheading}
            </p>

            {/* Supporting Paragraph */}
            <p className="text-base text-neutral-400 max-w-xl leading-relaxed mb-8">
              Discover a style that fits your personality. From weightless knotless braids and crisp
              stitch cornrows to luxurious twists, explore our braiding services and send us your
              appointment request.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onBookClick}
                className="gold-gradient-bg text-neutral-950 font-bold px-7 py-3.5 rounded-full text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-neutral-950" />
                <span>Book Your Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="bg-transparent text-neutral-200 hover:text-white border border-neutral-700 hover:border-[#D6A52B] px-6 py-3.5 rounded-full text-base font-medium transition-all flex items-center gap-2 cursor-pointer hover:bg-neutral-900/60"
              >
                <span>Explore Our Styles</span>
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-10 pt-6 border-t border-neutral-800/80 flex flex-wrap gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D6A52B]" />
                <span>Gentle, Protective Braiding</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D6A52B]" />
                <span>Open 7 Days (7 AM – 9 PM)</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (lg: 5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Decorative Gold Curved Arc Border Frame */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D6A52B] via-[#F2D27A] to-transparent rounded-3xl opacity-40 blur-sm transform rotate-1" />
              
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D6A52B]/40 shadow-2xl bg-neutral-950 aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/4]">
                <img
                  src="/images/hero-model.webp"
                  alt="Professional African Hair Braiding Client with Sleek Braids at Syviana Africa in Chicago"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = '/public/assets/aistudio/DE9F75D9-739F-414D-8DA4-B7B44EDCA538_62e87381.png';
                  }}
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-neutral-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="block font-bold text-white">Ashburn / Southwest Chicago</span>
                    <span className="text-neutral-400">{BUSINESS_CONFIG.address.street}</span>
                  </div>
                  <span className="text-[#D6A52B] font-semibold text-right">Walk-ins & Requests Welcome</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
