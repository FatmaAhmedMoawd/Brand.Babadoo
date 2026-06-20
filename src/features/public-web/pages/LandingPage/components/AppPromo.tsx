import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Smartphone } from 'lucide-react';
import { Button, Logo } from '@/shared/ui/Common';
import { useRTL } from '@/shared/hooks/useRTL';

export const AppPromo: React.FC = () => {
  const { t } = useTranslation();
  const { offset } = useRTL();

  return (
    <section className="py-32 bg-white overflow-hidden text-center">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">{t('promo.title')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              {t('promo.desc')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32 pt-8">
            {/* Phone Mockup */}
            <motion.div
              initial={{ opacity: 0, x: offset(-30) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              className="relative"
            >
              <div className="bg-[#1E1E1E] rounded-[60px] p-2 shadow-[0_50px_100px_rgba(0,0,0,0.15)] w-full max-w-[280px] mx-auto aspect-[9/18.5] border-[10px] border-[#2E2E2E] overflow-hidden relative rotate-[-2deg]">
                <div className="bg-white h-full w-full rounded-[44px] overflow-hidden flex flex-col items-center justify-start p-6 text-center space-y-4">
                  <div className="flex justify-between w-full pt-2 opacity-50 px-2" dir="ltr">
                     <span className="text-[10px] font-bold">09:41</span>
                     <div className="flex gap-1">
                       <div className="w-4 h-2 bg-black rounded-full" />
                     </div>
                  </div>
                  <div className="pt-4 pb-2">
                     <Logo invert className="scale-75" />
                  </div>
                  <div className="w-full aspect-square bg-[#FDF8F3] rounded-full flex items-center justify-center relative overflow-hidden">
                     <img 
                       src="https://i.postimg.cc/qBsdYbWj/onboarding-1.png" 
                       alt="App Screenshot" 
                       className="w-full h-full object-cover"
                       referrerPolicy="no-referrer"
                     />
                  </div>
                  <div className="space-y-2 pt-4">
                    <h4 className="text-lg font-bold text-brand-dark leading-tight">Your City, Delivered</h4>
                    <p className="text-[10px] text-gray-400">All your daily needs in one place</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-full pt-2">
                     {['Food', 'Grocery', 'Health'].map((t, i) => (
                       <div key={i} className="text-[8px] bg-brand-light rounded-full py-1 font-bold text-brand-brown">{t}</div>
                     ))}
                  </div>
                  <div className="mt-auto w-full pb-6">
                    <Button className="w-full py-3 rounded-xl bg-brand-brown text-[10px] font-bold uppercase tracking-widest shadow-md">{t('promo.continue')}</Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* QR and Store Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: offset(30) }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              className="space-y-16"
            >
              <div className="space-y-6">
                <div className="w-56 h-56 bg-white p-4 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] mx-auto flex items-center justify-center border border-gray-50">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-brand-dark">
                    <rect width="25" height="25" x="0" y="0" fill="currentColor" rx="2" />
                    <rect width="25" height="25" x="75" y="0" fill="currentColor" rx="2" />
                    <rect width="25" height="25" x="0" y="75" fill="currentColor" rx="2" />
                    <path d="M40,0 h10 v10 h-10 z M60,0 h10 v10 h-10 z M0,40 h10 v10 h-10 z M20,40 h10 v10 h-10 z M40,40 h20 v20 h-20 z M70,40 h10 v10 h-10 z M90,40 h10 v10 h-10 z M0,60 h10 v10 h-10 z M20,60 h10 v10 h-10 z M70,60 h10 v10 h-10 z M90,60 h10 v10 h-10 z M40,70 h10 v10 h-10 z M60,70 h10 v10 h-10 z M40,90 h10 v10 h-10 z M60,90 h10 v10 h-10 z" fill="currentColor" />
                  </svg>
                </div>
                <p className="text-lg text-brand-brown font-medium tracking-tight">{t('promo.scan')}</p>
              </div>

              <div className="flex flex-wrap gap-6 justify-center">
                <button 
                  aria-label="تحميل التطبيق من متجر الآب ستور App Store"
                  className="bg-brand-brown text-white px-10 py-4 rounded-xl flex items-center gap-3 font-bold shadow-lg hover:bg-brand-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
                >
                  <Smartphone className="w-6 h-6" />
                  App Store
                </button>
                <button 
                  aria-label="تحميل التطبيق من متجر جوجل بلاي Google Play"
                  className="bg-white border-2 border-gray-100 text-brand-brown px-10 py-4 rounded-xl flex items-center gap-3 font-bold hover:border-brand-brown transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2"
                >
                  <Smartphone className="w-6 h-6" />
                  Google Play
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
