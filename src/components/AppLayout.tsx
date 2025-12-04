import React from 'react';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import PlatformSection from './PlatformSection';
import OverviewSection from './OverviewSection';
import TestimonialsSection from './TestimonialsSection';
import EndorsementForm from './EndorsementForm';
import VolunteerSection from './VolunteerSection';
import ContactSection from './ContactSection';
import FloatingActionButton from './FloatingActionButton';
import Footer from './Footer';
import CouncilSection from './CouncilSection';
import AppreciationSection from './AppreciationSection';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <PlatformSection />
      <OverviewSection />
      <CouncilSection />
      <AppreciationSection />
      <TestimonialsSection />
      <EndorsementForm />
      <VolunteerSection />
      <ContactSection />
      <FloatingActionButton />
      <Footer />
    </div>
  );
};

export default AppLayout;
