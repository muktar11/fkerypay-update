import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import english from './locales/english.json';
import amharic from './locales/amharic.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: english },
      am: { translation: amharic },
    },
    lng: 'am', // Set Amharic as the default language
    fallbackLng: 'en', // Fallback to English if translation is not found
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
