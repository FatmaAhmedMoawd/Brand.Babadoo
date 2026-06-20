import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui/Common";

export const PartnerFAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: t("partner.q1"), a: t("partner.q1_a") },
    { q: t("partner.q2"), a: t("partner.q2_a") },
    { q: t("partner.q3"), a: t("partner.q3_a") },
    { q: t("partner.q4"), a: t("partner.q4_a") },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-black text-brand-dark font-cairo">
            {t("partner.faqTitle")}
          </h2>
          <p className="text-xl text-gray-600 font-cairo">
            {t("partner.faqSubtitle")}
          </p>
        </div>

        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl transition-all duration-500 overflow-hidden border ${
                openIndex === idx
                  ? "bg-gray-100 border-gray-200 shadow-md"
                  : "bg-white border-gray-100 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="">
                <button
                  className="w-full flex items-center justify-between p-6 md:p-8 text-xl font-bold text-brand-dark font-cairo focus:outline-none text-start"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                  aria-label={`سؤال: ${faq.q}. انقر لتوسيع أو طي الإجابة.`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-500 transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    openIndex === idx ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0 text-gray-500 font-cairo font-medium text-lg leading-relaxed text-start">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="reach" className="bg-[#FFF8F3] rounded-2xl p-10 text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold text-brand-dark font-cairo mb-2">
            {t("partner.stillQuestions")}
          </h3>
          <p className="text-gray-600 font-cairo mb-6">
            {t("partner.supportTeam")}
          </p>
          <Button
            variant="secondary"
            className="bg-[#D38842] hover:bg-[#b07032] text-white px-8 border-none font-cairo"
          >
            {t("partner.contactSupport")}
          </Button>
        </div>
      </div>
    </section>
  );
};
