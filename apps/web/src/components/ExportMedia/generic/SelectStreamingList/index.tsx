import { Api, EStreamingType } from 'api-types'
import { FC } from 'react'
import { Container } from '@chakra-ui/react'
import { capitalize } from 'lodash'

import { CardItem } from '../CardItem'
import { convertStreamingType } from '../../../../utils/api.ts'
import { streamingToLogo } from '../../../../utils/image.ts'

type TProps = {
  targetStreaming?: EStreamingType,
  onClick: (type: EStreamingType) => void,
  streamings: Api.Streaming.List.Streaming[],
}

export const SelectStreamingList: FC<TProps> = ({ targetStreaming, onClick, streamings }) => {
  return (
    <Container>
      {streamings.map((s) => (
        <CardItem
          isSelected={s.type === targetStreaming}
          title={capitalize(convertStreamingType(s.type).toApi())}
          image={streamingToLogo(s.type)}
          key={s.type}
          onClick={() => onClick(s.type)}
        />
      ))}
    </Container>
  )
}
