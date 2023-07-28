import { useTranslation } from 'react-i18next'

import { Dictionary, dictionary } from '../localization/langs'

export const useLocalization = () => {
  const { t } = useTranslation()

  return { t: (key: keyof Dictionary) => t(key), d: dictionary }
}
