import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { DollarSign, Gift, Percent, CircleDollarSign } from "lucide-react";
import { useRTL } from "@/shared/hooks/useRTL";

export const PartnerWhy: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const reasons = [
    {
      icon: DollarSign,
      title: t("partner.w1_title"),
      desc: t("partner.w1_desc"),
    },
    {
      icon: Gift,
      title: t("partner.w2_title"),
      desc: t("partner.w2_desc"),
    },
    {
      icon: Percent,
      title: t("partner.w3_title"),
      desc: t("partner.w3_desc"),
    },
    {
      icon: CircleDollarSign, 
      title: t("partner.w4_title"),
      desc: t("partner.w4_desc"),
    },
  ];

  return (
    <section id="why" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark font-cairo mb-4">
            {t("partner.whyTitle")}
          </h2>
          <p className="text-xl text-gray-400 font-cairo">
            {t("partner.whySubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(isActive ? null : idx)}
                className={`bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-md border-2 transition-all duration-500 group relative overflow-hidden cursor-pointer ${
                  isActive ? "border-brand-brown" : "border-gray-200"
                }`}
              >
                {/* Active Background Animation */}
                <div
                  className={`absolute inset-0 bg-brand-brown/5 pointer-events-none z-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive 
                      ? "translate-x-0" 
                      : (isRTL ? "-translate-x-full font-cairo" : "translate-x-full")
                  }`}
                />

                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 shadow-sm relative z-10 ${
                  isActive ? "bg-brand-brown scale-110" : "bg-brand-brown/10"
                }`}>
                  <Icon className={`w-10 h-10 transition-colors duration-500 ${
                    isActive ? "text-white" : "text-brand-brown"
                  }`} />
                </div>

                <h3 className={`text-2xl font-bold font-cairo mb-4 relative z-10 transition-colors ${
                  isActive ? "text-brand-brown" : "text-brand-dark"
                }`}>
                  {reason.title}
                </h3>
                <p className={`font-cairo text-lg leading-relaxed max-w-[280px] relative z-10 transition-colors ${
                  isActive ? "text-brand-dark" : "text-gray-600"
                }`}>
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
