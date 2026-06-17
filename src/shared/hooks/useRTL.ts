import { useTranslation } from 'react-i18next';

export const useRTL = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language ? i18n.language.startsWith('ar') : true;

  // Helper function to flip horizontal offsets (x) in framer-motion based on the direction
  const offset = (val: number) => isRTL ? -val : val;

  return { isRTL, offset };
};
