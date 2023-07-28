import { useTranslation, UseTranslationOptions } from 'react-i18next'

import { dictionary } from '../localization/langs'
import { Dictionary } from '../localization/types'

export const useLocalization = () => {
  const { t, ...rest } = useTranslation()

  return {
    ...rest,
    _t: t,
    t: (ns: keyof Dictionary, options?: UseTranslationOptions<undefined>) => t(ns, options),
    d: dictionary,
  }
}
