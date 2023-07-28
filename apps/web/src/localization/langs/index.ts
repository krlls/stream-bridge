import { ru } from './ru.ts'
import { en } from './en.ts'

export const primaryLang = en

export enum Lang {
  RU = 'ru',
  EN = 'en',
}

export type Dictionary = typeof primaryLang
export type Resources = {
  translation: Dictionary,
}

export type Translations = Record<Lang, Resources>
export type TranslationProp = keyof Dictionary

export const resources: Translations = {
  [Lang.RU]: {
    translation: ru,
  },
  [Lang.EN]: {
    translation: en,
  },
}

const emptyTranslations: Record<TranslationProp, TranslationProp> = {} as Record<TranslationProp, TranslationProp>

for (const key in primaryLang) {
  ;(emptyTranslations as Record<string, string>)[key] = key
}

export const dictionary = emptyTranslations
