import { FC } from 'react'
import { Container, Spinner } from '@chakra-ui/react'
import { capitalize } from 'lodash'

import { useGetStreamingListQuery } from '../../../../data/streaming'
import { CardItem } from '../../generic/CardItem'
import { convertStreamingType } from '../../../../utils/api.ts'
import { streamingToLogo } from '../../../../utils/image.ts'
import { useExportMediaState } from '../../../../hooks/useExportMediaState.ts'
import { setTargetStreaming } from '../../ExportContext/reducer.ts'
import { TStepProps } from '../../index.inerfaces.ts'

export type TProps = TStepProps

export const SelectStreaming: FC<TProps> = ({ children }) => {
  const { state, dispatch } = useExportMediaState()
  const { data, isLoading, isFetching } = useGetStreamingListQuery()
  const isNext = !!state.targetStreamingType

  if (isLoading || isFetching) {
    return <Spinner size='md' />
  }

  return (
    <>
      <Container>
        {data?.items
          .filter((s) => s.type !== state.originStreamingType)
          .map((s) => (
            <CardItem
              isSelected={s.type === state.targetStreamingType}
              title={capitalize(convertStreamingType(s.type).toApi())}
              image={streamingToLogo(s.type)}
              key={s.type}
              onClick={() => dispatch(setTargetStreaming(s.type))}
            />
          ))}
      </Container>
      {children(isNext)}
    </>
  )
}
