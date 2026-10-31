import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../config/business';

interface GallerySectionProps {
  onSelectStyle: (styleName: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectStyle }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Styles' },
    { id: 'knotless', label: 'Knotless' },
    { id: 'stitch', label: 'Stitch & Tribal' },
    { id: 'updos', label: 'Updos & Buns' },
    { id: 'box', label: 'Color & Ombré' },
  ];

  const filteredItems =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="py-20 bg-[#0B0B0B] text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with gold lines */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-4 mb-3">
            <span className="h-[2px] w-12 sm:w-20 bg-[#D6A52B]" />
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Our Styles Gallery
            </h2>
            <span className="h-[2px] w-12 sm:w-20 bg-[#D6A52B]" />
          </div>
          <p className="text-neutral-400 text-sm sm:text-base">
            Explore authentic styling work and client inspirations. Click any look to inspect details
            or request it for your appointment.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'gold-gradient-bg text-black shadow-md'
                    : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer aspect-[4/5] hover:border-[#D6A52B] transition-all duration-300 shadow-md hover:shadow-2xl"
            >
              <img
                src={item.image}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/public/assets/aistudio/DE9F75D9-739F-414D-8DA4-B7B44EDCA538_62e87381.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                <span className="text-xs font-bold text-[#F2D27A] line-clamp-2">
                  {item.title}
                </span>
                <span className="text-[11px] text-neutral-300 mt-1 flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-[#D6A52B]" />
                  Click to view
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Detailed Inspection */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative bg-neutral-900 rounded-3xl max-w-xl w-full border border-neutral-700 p-6 shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[4/4] bg-neutral-950 mb-5 border border-neutral-800">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-luxury text-lg font-bold text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Syviana Africa Hair Braiding Chicago Portfolio
                  </p>
                </div>

                <button
                  onClick={() => {
                    const styleName = selectedPhoto.title.includes('Knotless')
                      ? 'Knotless Braids'
                      : selectedPhoto.title.includes('Stitch')
                      ? 'Stitch Braids'
                      : selectedPhoto.title.includes('Bun')
                      ? 'Braided Updos & More'
                      : selectedPhoto.title.includes('Ombré')
                      ? 'Box Braids'
                      : selectedPhoto.title;
                    onSelectStyle(styleName);
                    setSelectedPhoto(null);
                  }}
                  className="gold-gradient-bg text-black font-bold text-sm px-5 py-2.5 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow hover:brightness-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request This Look</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
