import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/shared/lib/utils';
import { flushSync } from 'react-dom';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language || 'ar';
  const isArabic = currentLang.startsWith('ar');

  const setLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      if (!document.startViewTransition) {
        i18n.changeLanguage(lang);
      } else {
        document.startViewTransition(() => {
          flushSync(() => {
            i18n.changeLanguage(lang);
          });
        });
      }
    }
  };

  return (
    <div className={cn("relative flex items-center bg-white/20 backdrop-blur-md rounded-md p-1", className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-4 py-1.5 rounded text-sm font-bold transition-all",
          !isArabic ? "bg-white text-brand-brown shadow-sm" : "text-white hover:text-white/80"
        )}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={cn(
          "px-4 py-1.5 rounded text-sm font-bold font-cairo transition-all",
          isArabic ? "bg-white text-brand-brown shadow-sm" : "text-white hover:text-white/80"
        )}
      >
        العربية
      </button>
    </div>
  );
};
