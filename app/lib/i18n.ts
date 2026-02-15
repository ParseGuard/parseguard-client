import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';

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
        resources: {
          en: { common: enCommon },
          ar: { common: arCommon },
        },
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
