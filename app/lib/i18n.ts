import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '../locales/en/common.json';
import commonAr from '../locales/ar/common.json';

/**
 * Translation resources
 */
const resources = {
  en: {
    common: commonEn
  },
  ar: {
    common: commonAr
  }
};

/**
 * Initialize i18next for SSR
 */
export async function initI18n(lng = 'en') {
  if (!i18n.isInitialized) {
    await i18n
      .use(initReactI18next)
      .init({
        lng,
        fallbackLng: 'en',
        resources,
        defaultNS: 'common',
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });
  }
  return i18n;
}

export default i18n;
