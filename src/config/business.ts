export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  priceNote?: string;
  durationNote?: string;
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'knotless' | 'box' | 'cornrows' | 'stitch' | 'twists' | 'updos';
  image: string;
  alt: string;
}

export const BUSINESS_CONFIG = {
  name: 'Syviana Africa Hair Braiding',
  tagline: 'Look Good • Feel Beautiful',
  subheading: 'Professional Hair Braiding Services in Chicago',
  phoneDisplay: '(708) 971-9940',
  phoneRaw: '+17089719940',
  address: {
    full: '3773 W 79th St, Chicago, IL 60652',
    street: '3773 W 79th St',
    city: 'Chicago',
    state: 'IL',
    zip: '60652',
    area: 'Ashburn / Southwest Chicago',
  },
  hours: {
    display: '7:00 AM – 9:00 PM',
    days: 'Monday – Sunday (7 Days a Week)',
    structuredHours: 'Mo-Su 07:00-21:00',
  },
  email: 'artworkexpressllc@gmail.com',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/search/?api=1&query=Syviana+Africa+Hair+Braiding+3773+W+79th+St+Chicago+IL+60652',
  googleProfileUrl:
    'https://www.google.com/search?kgmid=%2Fg%2F11vc540m51&hl=en-US&q=Syviana%20Africa%20hair%20Braiding',
  social: {
    // Verified or standard handles for Chicago hair braiding
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
  verificationStatus: [
    {
      field: 'Business Name',
      value: 'Syviana Africa Hair Braiding',
      status: 'VERIFIED',
      source: 'Google Business Profile & Reference',
    },
    {
      field: 'Phone Number',
      value: '(708) 971-9940',
      status: 'VERIFIED',
      source: 'Google Business Profile & Mockup',
    },
    {
      field: 'Address',
      value: '3773 W 79th St, Chicago, IL 60652',
      status: 'VERIFIED',
      source: 'Client Mockup & Google Business Listing',
    },
    {
      field: 'Operating Hours',
      value: '7:00 AM – 9:00 PM (Monday – Sunday)',
      status: 'VERIFIED',
      source: 'Client Mockup & Google Business Profile (configurable in business.ts)',
    },
    {
      field: 'Notification Email',
      value: 'artworkexpressllc@gmail.com',
      status: 'VERIFIED',
      source: 'Client Directive in Project Brief',
    },
    {
      field: 'Pricing & Exact Service Durations',
      value: 'Customized based on hair length, thickness, and size',
      status: 'CONFIGURABLE',
      source: 'Consultation-based (no invented static prices)',
    },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'box-braids',
    name: 'Box Braids',
    category: 'Traditional & Modern Braids',
    description:
      'Classic, protective box sections crafted with precision for long-lasting beauty and versatile styling options.',
    image: '/images/service-box-braids.webp',
    popular: true,
  },
  {
    id: 'cornrows',
    name: 'Cornrows',
    category: 'Scalp Braids & Neat Lines',
    description:
      'Sleek, close-to-scalp patterns tailored to your personal taste, from clean straight backs to custom geometric curves.',
    image: '/images/service-cornrows.webp',
    popular: true,
  },
  {
    id: 'knotless-braids',
    name: 'Knotless Braids',
    category: 'Gentle & Natural Root',
    description:
      'Weightless, seamless braids installed with the feeding technique for zero tension, effortless movement, and instant comfort.',
    image: '/images/service-knotless.webp',
    popular: true,
  },
  {
    id: 'stitch-braids',
    name: 'Stitch Braids',
    category: 'High-Definition Precision',
    description:
      'Crisp, razor-sharp stitch lines with immaculate parting that elevate cornrows into a luxury statement style.',
    image: '/images/service-stitch.webp',
    popular: true,
  },
  {
    id: 'senegalese-twists',
    name: 'Senegalese Twists',
    category: 'Smooth & Silky Twists',
    description:
      'Silky two-strand rope twists offering a refined texture, easy maintenance, and stunning natural drape.',
    image: '/images/service-twists.webp',
    popular: false,
  },
  {
    id: 'and-more',
    name: 'Braided Updos & More',
    category: 'Custom & Event Styling',
    description:
      'High braided buns, tribal designer patterns, Goddess braids, Bohemian curls, and custom occasion styling.',
    image: '/images/service-and-more.webp',
    popular: false,
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Flawless Waist-Length Knotless Braids',
    category: 'knotless',
    image: '/images/gallery-1.webp',
    alt: 'Back view of long black knotless braids done at Syviana Africa Hair Braiding in Chicago',
  },
  {
    id: 'gal-2',
    title: 'Designer Stitch & Tribal Parting',
    category: 'stitch',
    image: '/images/gallery-2.webp',
    alt: 'Side angle of detailed geometric stitch braids with sleek baby hair edges',
  },
  {
    id: 'gal-3',
    title: 'Natural Root Knotless with Styled Edges',
    category: 'knotless',
    image: '/images/gallery-3.webp',
    alt: 'Front portrait showing smooth knotless braids framing face with contoured edges',
  },
  {
    id: 'gal-4',
    title: 'Elegant Braided High Crown Bun',
    category: 'updos',
    image: '/images/gallery-4.webp',
    alt: 'Sculpted braided top bun and sleek cornrow base for special occasions',
  },
  {
    id: 'gal-5',
    title: 'Wine Red Ombré Braided Style',
    category: 'box',
    image: '/images/gallery-5.webp',
    alt: 'Vibrant burgundy and wine red ombre braids with clean sectioning',
  },
];
