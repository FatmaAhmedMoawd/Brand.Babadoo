import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Route, SearchCheck, Shield, Box, Search, Ticket } from "lucide-react";
import { Button } from "@/shared/ui/Common";
import { useRTL } from "@/shared/hooks/useRTL";

export const Features: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [activeReasonIdx, setActiveReasonIdx] = useState<number | null>(null);
  const [activeFeatureIdx, setActiveFeatureIdx] = useState<number | null>(null);

  return (
    <>
      {/* Connecting Section */}
      <section className="py-32 bg-white text-center overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-20 text-brand-dark leading-[1.4] md:leading-[1.3] px-2"
            dangerouslySetInnerHTML={{ __html: t("reasons.title") }}
          />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 max-w-6xl mx-auto">
            {(
              t("reasons.items", { returnObjects: true }) as Array<{
                title: string;
                desc: string;
              }>
            ).map((feature, idx) => {
              const isActive = activeReasonIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: idx * 0.12,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveReasonIdx(isActive ? null : idx)}
                  className={`relative rounded-[40px] bg-white border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive ? "border-brand-brown shadow-2xl" : "border-[#6a7282]/40 shadow-md"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ x: isRTL ? "-100%" : "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: isRTL ? "100%" : "-100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-brand-brown/5 pointer-events-none z-0"
                      />
                    )}
                  </AnimatePresence>

                  <div className="p-10 h-full flex flex-col items-center relative z-10">
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-10 transition-all duration-500 ${
                      isActive ? "bg-brand-brown scale-110" : "bg-brand-brown/10"
                    }`}>
                      {idx === 0 && <Route className={`w-10 h-10 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                      {idx === 1 && <SearchCheck className={`w-10 h-10 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                      {idx === 2 && <Shield className={`w-10 h-10 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                    </div>
                    <h3 className={`text-2xl font-bold mb-6 tracking-tight font-cairo leading-[1.4] md:leading-[1.3] transition-colors ${
                      isActive ? "text-brand-brown" : "text-brand-dark"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`leading-[1.8] md:leading-[1.7] text-lg font-light text-center transition-colors ${
                      isActive ? "text-brand-dark" : "text-gray-600"
                    }`}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section id="features" className="py-32 bg-[#F9F9FA] text-center overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-20 text-brand-dark"
          >
            {t("features.title")}
          </motion.h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10 max-w-6xl mx-auto mb-20">
            {(
              t("features.items", { returnObjects: true }) as Array<{
                title: string;
                desc: string;
              }>
            ).map((feature, idx) => {
              const isActive = activeFeatureIdx === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: idx * 0.12,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onClick={() => setActiveFeatureIdx(isActive ? null : idx)}
                  className={`relative rounded-[40px] bg-white border transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive ? "border-brand-brown shadow-2xl" : "border-[#6a7282]/40 shadow-md"
                  }`}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ x: isRTL ? "-100%" : "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: isRTL ? "100%" : "-100%" }}
                        transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-brand-brown/5 pointer-events-none z-0"
                      />
                    )}
                  </AnimatePresence>

                  <div className="p-10 h-full flex flex-col items-center relative z-10">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 ${
                      isActive ? "bg-brand-brown rotate-12" : "bg-brand-brown/10"
                    }`}>
                      {idx === 0 && <Box className={`w-8 h-8 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                      {idx === 1 && <Search className={`w-8 h-8 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                      {idx === 2 && <Ticket className={`w-8 h-8 ${isActive ? "text-white" : "text-brand-brown"}`} />}
                    </div>
                    <h3 className={`text-2xl font-bold mb-6 font-cairo transition-colors ${
                      isActive ? "text-brand-brown" : "text-brand-dark"
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`leading-relaxed text-lg font-light text-center transition-colors ${
                      isActive ? "text-brand-dark" : "text-gray-600"
                    }`}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <Button
            variant="primary"
            size="lg"
            className="rounded-xl px-16 py-5 bg-brand-brown hover:scale-105 shadow-xl transition-all font-bold tracking-wide"
          >
            {t("features.getStarted")}
          </Button>
        </div>
      </section>
    </>
  );
};
