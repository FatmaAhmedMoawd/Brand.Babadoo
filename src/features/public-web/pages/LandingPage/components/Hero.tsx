import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Smartphone, Users } from "lucide-react";
import { Button } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";

const HERO_IMAGES = [
  "https://i.postimg.cc/0yM7747k/hero-2.png",
  "https://i.postimg.cc/vBM9FHks/Browse-Reserve.png",
];

const FloatingDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Clusters of shapes to mimic the Sololearn screenshot */}
      {[
        // Left Cluster
        { top: '25%', left: '8%', size: 14, type: 'plus', color: 'rgba(211, 136, 66, 0.4)' },
        { top: '32%', left: '12%', size: 6, type: 'dot', color: 'rgba(211, 136, 66, 0.3)' },
        { top: '28%', left: '5%', size: 4, type: 'dot', color: 'rgba(255, 255, 255, 0.2)' },
        { top: '40%', left: '10%', size: 12, type: 'plus', color: 'rgba(255, 255, 255, 0.2)' },
        
        // Right Cluster
        { top: '20%', left: '88%', size: 16, type: 'plus', color: 'rgba(211, 136, 66, 0.4)' },
        { top: '15%', left: '92%', size: 5, type: 'dot', color: 'rgba(255, 255, 255, 0.2)' },
        { top: '28%', left: '90%', size: 10, type: 'plus', color: 'rgba(255, 255, 255, 0.2)' },
        { top: '35%', left: '85%', size: 6, type: 'dot', color: 'rgba(211, 136, 66, 0.3)' },

        // Center Scattered
        { top: '10%', left: '50%', size: 12, type: 'plus', color: 'rgba(255, 255, 255, 0.1)' },
        { top: '75%', left: '20%', size: 8, type: 'plus', color: 'rgba(255, 255, 255, 0.15)' },
        { top: '80%', left: '75%', size: 6, type: 'dot', color: 'rgba(211, 136, 66, 0.2)' },
      ].map((item, i) => (
        <div
          key={`decor-${i}`}
          className="absolute opacity-30 select-none pointer-events-none"
          style={{ 
            top: item.top, 
            left: item.left,
            width: item.type === 'plus' ? 'auto' : item.size,
            height: item.type === 'plus' ? 'auto' : item.size,
            borderRadius: item.type === 'dot' ? '50%' : '0',
            backgroundColor: item.type === 'dot' ? item.color : 'transparent',
            color: item.type === 'plus' ? item.color : 'transparent'
          }}
        >
          {item.type === 'plus' && (
            <svg width={item.size} height={item.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

const AnimatedWaves: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <FloatingDecorations />
      <svg
        className="absolute bottom-0 left-0 w-[200%] h-[40%] transform translate-z-0 opacity-10"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 C 150 70, 350 30, 500 50 C 650 70, 850 30, 1000 50 L 1000 100 L 0 100 Z"
          fill="rgba(255, 255, 255, 0.4)"
        />
      </svg>
    </div>
  );
};

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center pt-48 md:pt-32 pb-20 overflow-hidden bg-brand-brown bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.1),transparent_40%)]">
      <AnimatedWaves />
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 items-center animate-fade-in-up">
        <div className="text-white space-y-10 order-1 lg:col-start-1 w-full text-center flex flex-col items-center">
          <div className="space-y-6 flex flex-col items-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.5] md:leading-[1.3] tracking-tight text-center font-cairo w-full max-w-[100vw] overflow-hidden px-4 md:px-2">
              <div className="text-center w-full drop-shadow-xl whitespace-normal break-words">
                <span className="inline-block bg-clip-text text-white mx-2 pb-2">
                  {t("hero.titleAnimated")}
                </span>
                <span className="text-white"> {t("hero.titleStatic")}</span>
              </div>
            </h1>

            <div className="flex flex-col items-center">
              <span className="block text-center whitespace-normal text-white text-base md:text-xl lg:mt-8 px-8 md:px-0 max-w-2xl font-medium tracking-wide leading-[1.8] md:leading-[1.8] text-white/90 mx-auto">
                {t("hero.subtitle")}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 mt-2 lg:mt-8 w-full justify-center order-3 lg:col-start-1 lg:row-start-2 lg:self-start lg:mx-auto px-6 sm:px-0">
          <div className="w-full sm:w-auto group">
            <Button
              variant="secondary"
              size="lg"
              className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-10 py-6 text-base md:text-xl font-bold font-cairo bg-white text-brand-dark border-none w-full justify-center gap-3 hover:shadow-[0_20px_50px_rgba(211,136,66,0.2)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-brown/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Smartphone className="w-6 h-6 text-brand-brown transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <span className="relative z-10">{t("hero.ctaPrimary")}</span>
            </Button>
          </div>
          <div className="w-full sm:w-auto group">
            <Link to="/partner" className="block w-full">
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl border-2 border-white/30 backdrop-blur-md hover:border-white/80 hover:bg-white/10 px-10 py-6 text-base md:text-xl font-bold font-cairo w-full text-white justify-center gap-3 transition-all duration-500 shadow-lg"
              >
                <Users className="w-6 h-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" />
                <span className="relative z-10">{t("hero.ctaSecondary")}</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative perspective-lg order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 w-full mt-6 lg:mt-0">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden z-10">
              {HERO_IMAGES.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className={cn(
                    "absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out",
                    currentImage === i ? "opacity-100 relative z-10" : "opacity-0 pointer-events-none"
                  )}
                  referrerPolicy="no-referrer"
                  alt="Babbadoo app preview screenshot"
                />
              ))}
            </div>

            {/* Slider Indicators */}
            <div className="flex justify-center gap-3 mt-6">
              {HERO_IMAGES.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 rounded-full bg-white transition-all duration-300",
                    currentImage === i ? "w-8 opacity-100" : "w-2 opacity-40"
                  )}
                />
              ))}
            </div>

            {/* Text under image */}
            <div className="mt-8 md:mt-12 text-center">
              <div className="text-3xl md:text-4xl font-bold text-white leading-snug font-cairo tracking-tight">
                {t("hero.discover")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
