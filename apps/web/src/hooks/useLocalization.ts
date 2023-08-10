import { useTranslation } from 'react-i18next'

import { dictionary } from '../localization/langs'
import { Dictionary } from '../localization/types'

export const useLocalization = () => {
  const { t, ...rest } = useTranslation()

  return {
    ...rest,
    _base: t,
    t: (ns: keyof Dictionary, options?: Record<string, string | number>) => t(ns, options),
    d: dictionary,
  }
}
