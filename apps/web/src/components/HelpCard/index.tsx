import { FC } from 'react'
import { ArrowLeftIcon, RepeatIcon } from '@chakra-ui/icons'

import { useGetStreamingListQuery } from '../../data/streaming'
import { CardWithAction } from '../CardWithAction'
import { useLocalization } from '../../hooks/useLocalization.ts'

export const HelpCard: FC = () => {
  const { data } = useGetStreamingListQuery()
  const { t, d } = useLocalization()

  if (data && data.items.length) {
    return (
      <CardWithAction
        title={t(d.CardWithActionTitle1)}
        text={t(d.CardWithActionText1)}
        icon={<ArrowLeftIcon boxSize='4em' />}
      />
    )
  }

  if (data && !data.items.length) {
    return (
      <CardWithAction
        title={t(d.CardWithActionTitle2)}
        text={t(d.CardWithActionText2)}
        icon={<RepeatIcon boxSize='4em' />}
      />
    )
  }

  return null
}
