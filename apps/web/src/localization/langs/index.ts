import { ru } from './ru.ts'
import { en } from './en.ts'

export enum Lang {
  RU = 'ru',
  EN = 'en',
}

export type Dictionary = typeof ru
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

export const resour = {
  en,
  ru,
}
