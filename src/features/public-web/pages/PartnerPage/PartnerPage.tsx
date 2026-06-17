import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRTL } from '@/shared/hooks/useRTL';
import { Navbar } from '../LandingPage/components/Navbar';
import { Footer } from '../LandingPage/components/Footer';
import { MobileMenu } from '../LandingPage/components/MobileMenu';
import { PartnerHero } from './components/PartnerHero';
import { PartnerFeatures } from './components/PartnerFeatures';
import { PartnerHowItWorks } from './components/PartnerHowItWorks';
import { PartnerRegistration } from './components/PartnerRegistration';
import { PartnerWhy } from './components/PartnerWhy';
import { PartnerFAQ } from './components/PartnerFAQ';

const PartnerPage: React.FC = () => {
  const { isRTL } = useRTL();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white font-sans text-brand-dark">
      <Navbar 
        isScrolled={isScrolled} 
        onMenuOpen={() => setIsMobileMenuOpen(true)} 
        isMenuOpen={isMobileMenuOpen}
      />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      <main>
        <PartnerHero />
        <PartnerFeatures />
        <PartnerHowItWorks />
        <PartnerRegistration />
        <PartnerWhy />
        <PartnerFAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnerPage;
