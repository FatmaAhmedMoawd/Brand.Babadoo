import React from "react";
import { useTranslation } from "react-i18next";

export const PartnerHowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      img: "https://i.postimg.cc/T3Kv3yC6/brand-1.png",
      title: t("partner.hw1_title"),
      desc: t("partner.hw1_desc"),
    },
    {
      img: "https://i.postimg.cc/kGGfvSVg/brand-3.png",
      title: t("partner.hw2_title"),
      desc: t("partner.hw2_desc"),
    },
    {
      img: "https://i.postimg.cc/ZnssGHkF/brand-2.png",
      title: t("partner.hw3_title"),
      desc: t("partner.hw3_desc"),
    },
    {
      img: "https://i.postimg.cc/VNsgngsK/Get-It-Delivered.png",
      title: t("partner.hw4_title"),
      desc: t("partner.hw4_desc"),
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-cairo">
            {t("partner.howItWorksTitle")}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="text-center flex flex-col items-center border-2 border-gray-100 p-8 rounded-3xl shadow-lg shadow-gray-200/30 hover:shadow-2xl hover:border-[#D38842]/30 hover:shadow-[#D38842]/10 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-8 w-full mt-2 overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="h-32 sm:h-40 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark font-cairo mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 font-cairo text-base font-medium leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
