import { Lang, primaryLang, TranslationDictionary, Translations } from '../types.ts'
import { ru } from './ru.ts'
import { en } from './en.ts'

export const resources: Translations = {
  [Lang.RU]: {
    translation: ru,
  },
  [Lang.EN]: {
    translation: en,
  },
}

const translations: Record<string, string> = { ...primaryLang }

Object.keys(translations).forEach((key) => {
  translations[key] = key
})

export const dictionary = Object.freeze(translations) as TranslationDictionary
