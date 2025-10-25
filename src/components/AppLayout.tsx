import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import PlatformSection from './PlatformSection';
import OverviewSection from './OverviewSection';
import TestimonialsSection from './TestimonialsSection';
import ProgressSection from './ProgressIndicator';
import DonateSection from './DonateSection';
import VolunteerSection from './VolunteerSection';
import ContactSection from './ContactSection';
import FloatingActionButton from './FloatingActionButton';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PlatformSection />
      <OverviewSection />
      <TestimonialsSection />
      <ProgressSection />
      <DonateSection />
      <VolunteerSection />
      <ContactSection />
      <FloatingActionButton />
      <Footer />
    </div>
  );
};

export default AppLayout;
