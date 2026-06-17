import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Button } from '@/shared/ui/Common';

export const BusinessSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 text-center"
          >
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-bold text-brand-dark tracking-tight leading-tight">
                {t('business.title').split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 0.8 }}
                    className="inline-block me-[0.2em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto"
              >
                {t('business.desc')}
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-4 space-y-8 flex flex-col items-center"
            >
              <Button variant="primary" size="lg" className="rounded-xl px-20 py-8 bg-brand-brown hover:bg-brand-dark transition-all text-xl font-bold shadow-xl">
                {t('business.joinNow')}
              </Button>
              <p className="text-lg text-gray-900 font-medium tracking-tight">
                {t('business.isShopper')} <a href="#" className="text-brand-brown font-bold hover:underline underline-offset-4 decoration-2">{t('business.downloadText')}</a>
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative p-4 flex justify-center"
          >
            <img 
              src="https://i.postimg.cc/ZnB4v4w0/hero-3.png" 
              alt="Business Analytics Illustration" 
              className="w-full h-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
