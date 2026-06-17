import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button, Logo } from "@/shared/ui/Common";
import { cn } from "@/shared/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface NavbarProps {
  isScrolled: boolean;
  onMenuOpen: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isScrolled, 
  onMenuOpen, 
  isMenuOpen 
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const isPartnerPage = location.pathname === "/partner";

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[60] px-4 sm:px-6 md:px-12 transition-all duration-500 ease-in-out flex items-center justify-between gap-4",
        isScrolled
          ? "bg-brand-dark/70 backdrop-blur-xl py-3 shadow-2xl border-b border-white/5"
          : "bg-transparent py-4 sm:py-8",
      )}
    >
      <Logo />

      {!isPartnerPage && (
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-white font-bold uppercase tracking-[0.15em] font-cairo text-[20px]">
          <button
            onClick={() => scrollTo("features")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.features")}
          </button>
          <button
            onClick={() => scrollTo("how-it-works")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.howItWorks")}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-3 min-h-[44px] hover:text-brand-light transition-all hover:scale-110 active:scale-95 drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-xl"
          >
            {t("nav.contact")}
          </button>
        </nav>
      )}

      <div className="flex items-center gap-4">
        <LanguageSwitcher className="hidden lg:flex" />
        {isPartnerPage ? (
          <Link to="/login">
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex rounded-lg px-8 bg-[#D38842] text-white hover:bg-[#b07032] border-none font-bold transition-all shadow-lg shadow-[#D38842]/20"
            >
              {t("nav.login")}
            </Button>
          </Link>
        ) : (
          <Link to="/partner">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-md px-6 border-white/40 hover:bg-white hover:text-brand-dark transition-all text-white"
            >
              {t("nav.join")}
            </Button>
          </Link>
        )}

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
          <LanguageSwitcher className="scale-90 origin-right rtl:origin-left sm:scale-100" />
          <button
            aria-label={t("nav.openMenu", "Open menu")}
            onClick={onMenuOpen}
            className="w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center text-white bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 active:scale-90 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark gap-[4px] px-0"
          >
            <span 
              className={cn(
                "w-5 sm:w-6 h-[2px] bg-white transition-all duration-300 rounded-full",
                isMenuOpen && "rotate-45 translate-y-[6px]"
              )} 
            />
            <span 
              className={cn(
                "w-5 sm:w-6 h-[2px] bg-white transition-all duration-300 rounded-full",
                isMenuOpen && "opacity-0"
              )} 
            />
            <span 
              className={cn(
                "w-5 sm:w-6 h-[2px] bg-white transition-all duration-300 rounded-full",
                isMenuOpen && "-rotate-45 -translate-y-[6px]"
              )} 
            />
          </button>
        </div>
      </div>
    </header>
  );
};
