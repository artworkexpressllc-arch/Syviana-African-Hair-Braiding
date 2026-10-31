import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { AppointmentFormSection } from './components/AppointmentFormSection';
import { LocationContactSection } from './components/LocationContactSection';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { BusinessVerificationModal } from './components/BusinessVerificationModal';

export default function App() {
  const [selectedHairstyle, setSelectedHairstyle] = useState<string>('Knotless Braids');

  const scrollToForm = useCallback(() => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the name input if accessible
      setTimeout(() => {
        const nameInput = document.getElementById('client_name') as HTMLInputElement | null;
        if (nameInput) {
          nameInput.focus();
        }
      }, 500);
    }
  }, []);

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectService = useCallback(
    (serviceName: string) => {
      setSelectedHairstyle(serviceName);
      scrollToForm();
    },
    [scrollToForm]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B] text-neutral-100 antialiased selection:bg-[#D6A52B] selection:text-black">
      {/* 1. Slim Top Bar & Navbar */}
      <Header onBookClick={scrollToForm} />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero onBookClick={scrollToForm} onExploreClick={scrollToServices} />

        {/* 3. Hairstyle Services Section */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 4. About Salon Section */}
        <AboutSection onBookClick={scrollToForm} />

        {/* 5. Hairstyle Gallery Showcase */}
        <GallerySection onSelectStyle={handleSelectService} />

        {/* 6. Appointment Request Form (Not a booking engine!) */}
        <AppointmentFormSection
          selectedHairstyle={selectedHairstyle}
          onHairstyleChange={setSelectedHairstyle}
        />

        {/* 7. Location, Hours, & Contact Section */}
        <LocationContactSection />

        {/* 8. Call to Action Gold Banner */}
        <CtaBanner onBookClick={scrollToForm} />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Audit & Business Verification Modal */}
      <BusinessVerificationModal />
    </div>
  );
}
