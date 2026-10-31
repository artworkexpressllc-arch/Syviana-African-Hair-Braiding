import React from 'react';
import { CheckCircle2, ArrowRight, HeartHandshake, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface AboutSectionProps {
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-20 bg-white text-neutral-900 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Salon Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-neutral-100 bg-neutral-900 aspect-[4/3] sm:aspect-[16/11]">
              <img
                src="/images/about-salon.webp"
                alt="Inside Syviana Africa Hair Braiding Salon in Chicago showing neat braided high ponytail"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/public/assets/aistudio/DE9F75D9-739F-414D-8DA4-B7B44EDCA538_62e87381.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-neutral-200 flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-[#9A6F00]">
                    Dedicated Care
                  </span>
                  <span className="font-serif-luxury font-bold text-neutral-900 text-sm">
                    Healthy Hair & Clean Partings
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FEF9C3] flex items-center justify-center text-[#D6A52B]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#9A6F00] font-bold mb-3">
              <HeartHandshake className="w-4 h-4 text-[#D6A52B]" />
              <span>Chicago's Trusted Salon</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 mb-6">
              About Syviana
            </h2>

            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-8">
              At <strong className="text-neutral-900">{BUSINESS_CONFIG.name}</strong>, we are committed to providing top-quality hair braiding services with style, care and professionalism. Whether you're looking for a fresh new look or a protective style, we've got you covered!
            </p>

            {/* Feature Checklist matching Mockup */}
            <div className="space-y-4 mb-9">
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 rounded-full p-1 bg-[#FEF9C3] text-[#D6A52B] flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 fill-[#D6A52B] text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    Professional & Friendly Service
                  </h4>
                  <p className="text-neutral-600 text-sm mt-0.5">
                    Attentive stylists who listen to your vision, protect your hairline, and make you feel right at home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 rounded-full p-1 bg-[#FEF9C3] text-[#D6A52B] flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 fill-[#D6A52B] text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    Clean & Comfortable Environment
                  </h4>
                  <p className="text-neutral-600 text-sm mt-0.5">
                    A welcoming, sanitized salon space equipped with comfortable seating for relaxed braiding sessions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 rounded-full p-1 bg-[#FEF9C3] text-[#D6A52B] flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 fill-[#D6A52B] text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-base">
                    Styles for Every Occasion
                  </h4>
                  <p className="text-neutral-600 text-sm mt-0.5">
                    Everyday protective hair care, vacation-ready styles, back-to-school braids, and special celebratory updos.
                  </p>
                </div>
              </div>
            </div>

            {/* Gold Action Button */}
            <div>
              <button
                onClick={onBookClick}
                className="gold-gradient-bg text-neutral-950 font-bold px-8 py-3.5 rounded-xl text-base shadow-md hover:shadow-xl hover:brightness-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Book Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
