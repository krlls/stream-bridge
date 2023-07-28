import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import { resources } from './langs'
import { Lang } from './types.ts'

export const defaultNS = 'translation'
await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: Lang.EN,
    defaultNS,

    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
