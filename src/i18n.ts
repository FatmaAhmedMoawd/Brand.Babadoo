import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { ar } from './locales/ar';

const resources = {
  ar: { translation: ar },
  en: { translation: en }
};

const savedLanguage = localStorage.getItem('user_language');
const defaultLanguage = savedLanguage || 'ar';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('user_language', lng);
  const isArabic = lng && lng.startsWith('ar');
  document.documentElement.lang = lng;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
});

// Set initial direction
if (i18n.language) {
  const isArabic = i18n.language.startsWith('ar');
  document.documentElement.lang = i18n.language;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
}

export default i18n;
