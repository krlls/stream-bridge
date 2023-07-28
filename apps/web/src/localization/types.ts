import { en } from './langs/en.ts'

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
export type TranslationDictionary = Record<TranslationProp, TranslationProp>
