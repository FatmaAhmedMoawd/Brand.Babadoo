import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Button } from '@/shared/ui/Common';

const STEPS_IMAGES = [
  "https://i.postimg.cc/L8MgSbsB/Set-Your-Location.png",
  "https://i.postimg.cc/1Xq4hGhj/Browse-Reserve.png",
  "https://i.postimg.cc/ZqbHLLX8/Get-It-Delivered.png"
];

export const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-32 bg-white text-center">
      <div className="container mx-auto px-6">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-4xl md:text-5xl font-bold mb-24 text-brand-dark"
        >
          {t('nav.howItWorks')}
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
          {(t('howItWorks.steps', { returnObjects: true }) as Array<{title: string, desc: string}>).map((step, idx) => (
            <React.Fragment key={idx}>
              <motion.div 
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ 
                  delay: idx * 0.15, 
                  duration: 0.9, 
                  ease: [0.22, 1, 0.36, 1] 
                }}
                className="flex-1 max-w-[360px] px-6 py-10 rounded-[40px] border border-[#6a7282]/40 shadow-md hover:border-brand-brown/30 hover:bg-brand-light/20 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="mb-10 relative">
                  <div className="w-full aspect-square rounded-[48px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.08)] border-[12px] border-white transition-transform group-hover:scale-105 duration-700 group-hover:rotate-1">
                    <img 
                      src={STEPS_IMAGES[idx]} 
                      alt={step.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark tracking-tight font-cairo">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base font-medium px-4">{step.desc}</p>
              </motion.div>
              
              {idx < 2 && (
                <div className="hidden lg:flex items-center mx-2 -translate-y-20">
                  <div className="flex items-center gap-1">
                     <div className="w-4 h-4 rounded-full bg-[#f6ad55]" />
                     <div className="w-20 lg:w-28 h-0 border-t-[3px] border-dotted border-[#f6ad55] relative">
                       <div className="absolute -end-1 -top-[9px] w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-s-[12px] border-s-[#f6ad55]" />
                     </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-24">
          <Button variant="primary" size="lg" className="rounded-2xl px-20 py-5 bg-brand-brown hover:bg-brand-dark transition-all text-lg font-bold shadow-xl">
            {t('howItWorks.learnMore')}
          </Button>
        </div>
      </div>
    </section>
  );
};
