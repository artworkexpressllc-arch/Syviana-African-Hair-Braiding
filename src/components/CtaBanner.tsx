import React from 'react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  onBookClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onBookClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#D6A52B] via-[#F2D27A] to-[#D6A52B] text-neutral-950 py-12 px-4 sm:px-6 lg:px-8 border-y-2 border-[#B8861C]">
      {/* Decorative background styling */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-6 text-center md:text-left">
          {/* Silhouette Art Icon */}
          <div className="hidden sm:flex w-16 h-16 rounded-full bg-black/10 border border-black/15 items-center justify-center flex-shrink-0">
            <Sparkles className="w-8 h-8 text-neutral-900" />
          </div>

          <div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
              Ready for a Fresh Look?
            </h2>
            <p className="text-neutral-900/90 text-lg font-medium mt-1">
              Book Your Appointment Today!
            </p>
          </div>
        </div>

        <div>
          <button
            onClick={onBookClick}
            className="bg-[#0B0B0B] hover:bg-black text-white font-bold text-base px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-[#D6A52B]" />
            <span>Book Appointment</span>
            <ArrowRight className="w-4 h-4 text-[#D6A52B] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
