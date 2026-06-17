import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { X, ChevronRight, Download, LogIn, Users } from "lucide-react";
import { Button, Logo } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";
import { useRTL } from "@/shared/hooks/useRTL";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = React.memo(({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPartnerPage = location.pathname === "/partner";
  const { offset, isRTL } = useRTL();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    // Use requestAnimationFrame for smoother transition after closing
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const menuItems = isPartnerPage
    ? [
        { label: t("nav.howItWorks"), id: "how-it-works" },
        { label: t("nav.partnerRegister"), id: "registration" },
        { label: t("nav.faq"), id: "faq" },
        { label: t("nav.features"), id: "why" },
      ]
    : [
        { label: t("nav.features"), id: "features" },
        { label: t("nav.howItWorks"), id: "how-it-works" },
        { label: t("nav.contact"), id: "contact" },
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[100] lg:hidden touch-none"
          />
          <motion.div
            initial={{ x: isRTL ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? "-100%" : "100%" }}
            transition={{ type: "spring", damping: 35, stiffness: 200, mass: 1 }}
            style={{ willChange: "transform" }}
            className={cn(
              "fixed inset-y-0 end-0 w-[300px] bg-white z-[101] lg:hidden flex flex-col p-8 shadow-2xl border-s border-gray-100",
              isRTL ? "rounded-l-none rounded-r-[40px] border-s-0 border-e" : "rounded-r-none rounded-l-[40px]"
            )}
          >
            <div className="flex items-center justify-between mb-10 w-full">
              <button
                onClick={onClose}
                className="w-10 h-10 flex flex-col items-center justify-center text-brand-dark bg-gray-50 hover:bg-gray-100 rounded-xl transition-all active:scale-95 gap-[4px]"
              >
                <X className="w-6 h-6" />
              </button>
              <Logo
                variant="horizontal"
                className="brightness-0 opacity-90 [&>img]:!h-[32px] shrink-0"
              />
            </div>

            <nav className="flex flex-col gap-3 overflow-y-auto max-h-[65vh] pr-1 pb-8 custom-scrollbar">
              {menuItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-brand-dark text-lg font-bold font-cairo text-start bg-white border border-gray-100 rounded-2xl p-4 hover:border-brand-brown/30 hover:bg-gray-50 transition-all flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-brand-brown transition-transform group-hover:translate-x-1",
                      isRTL && "rotate-180 group-hover:-translate-x-1",
                    )}
                  />
                </button>
              ))}
            </nav>

            <div className="mt-auto space-y-3">
              <Button
                variant="primary"
                className="w-full h-14 rounded-2xl font-bold font-cairo text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                <Download className="w-5 h-5" />
                <span>{t("nav.download")}</span>
              </Button>
              {isPartnerPage ? (
                <Link to="/login" onClick={onClose} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-brand-brown/10 text-brand-brown font-bold font-cairo text-lg hover:bg-brand-brown/5"
                  >
                    <LogIn className={cn("w-5 h-5", isRTL && "rotate-180")} />
                    <span className="ms-2">{t("nav.login")}</span>
                  </Button>
                </Link>
              ) : (
                <Link to="/partner" onClick={onClose} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full h-14 rounded-2xl border-2 border-brand-brown/10 text-brand-brown font-bold font-cairo text-lg hover:bg-brand-brown/5"
                  >
                    <Users className="w-5 h-5" />
                    <span className="ms-2">{t("nav.join")}</span>
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

MobileMenu.displayName = "MobileMenu";
