import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

import { TStepProps } from '../../index.inerfaces.ts'
import { StreamingInfo } from '../../generic/StreamingInfo'
import { useExportMediaState } from '../../../../hooks/useExportMediaState.ts'

export const ExportStep: FC<TStepProps> = ({ children }) => {
  const { state } = useExportMediaState()

  if (!state.originStreamingType || !state.targetStreamingType) {
    return null
  }

  return (
    <>
      <Flex justifyContent={'center'}>
        <StreamingInfo
          originStreamingType={state.originStreamingType}
          targetStreamingType={state.targetStreamingType}
        />
      </Flex>
      {children(true)}
    </>
  )
}
