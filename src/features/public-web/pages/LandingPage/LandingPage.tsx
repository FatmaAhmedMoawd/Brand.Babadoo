import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { AppPromo } from "./components/AppPromo";
import { Footer } from "./components/Footer";

/**
 * LandingPage component for Babbadoo.
 * This component orchestrates the landing page sections and global state like
 * navigation visibility and language direction.
 */
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events to update navbar state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand-brown/30">
      {/* Navigation Layer */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <Navbar 
        isScrolled={isScrolled} 
        onMenuOpen={() => setIsMenuOpen(true)} 
        isMenuOpen={isMenuOpen}
      />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <AppPromo />
      </main>

      {/* Footer Layer */}
      <Footer />
    </div>
  );
}
