import { useLanguageStore } from '@/stores/languageStore';
import { translations } from '@/lib/translations';
import { useEffect } from 'react';

export function useLanguage() {
  const { language, setLanguage, toggleLanguage } = useLanguageStore();
  const t = translations[language];
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  return {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isRTL,
    dir: isRTL ? 'rtl' : 'ltr',
    fontClass: isRTL ? 'font-body-ar' : 'font-body-en',
    headingClass: isRTL ? 'font-heading-ar' : 'font-heading-en',
  };
}
