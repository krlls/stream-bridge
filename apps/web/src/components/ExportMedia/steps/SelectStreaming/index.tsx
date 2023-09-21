import { FC } from 'react'
import { Container, Spinner } from '@chakra-ui/react'

import { useGetStreamingListQuery } from '../../../../data/streaming'
import { useExportMediaState } from '../../../../hooks/useExportMediaState.ts'
import { setTargetStreaming } from '../../ExportContext/reducer.ts'
import { TStepProps } from '../../index.inerfaces.ts'
import { SelectStreamingList } from '../../generic/SelectStreamingList'

export const SelectStreaming: FC<TStepProps> = ({ children }) => {
  const { state, dispatch } = useExportMediaState()
  const { data, isLoading, isFetching } = useGetStreamingListQuery()
  const isNext = !!state.targetStreamingType

  if (isLoading || isFetching) {
    return <Spinner size='md' />
  }

  return (
    <>
      <Container>
        <SelectStreamingList
          streamings={(data?.items || []).filter((s) => s.type !== state.originStreamingType)}
          targetStreaming={state.targetStreamingType}
          onClick={(type) => dispatch(setTargetStreaming(type))}
        />
      </Container>
      {children(isNext)}
    </>
  )
}
