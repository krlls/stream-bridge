import { FC } from 'react'
import {
  Button,
  Container,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
} from '@chakra-ui/react'

import { IStrategy } from '../index.inerfaces.ts'
import { useExportMediaState } from '../../../hooks/useExportMediaState.ts'
import { incStep } from '../ExportContext/reducer.ts'

type TProps = {
  strategy: IStrategy,
}

export const Strategy: FC<TProps> = ({ strategy }) => {
  const { name, steps } = strategy
  const { state, dispatch } = useExportMediaState()

  return (
    <Container>
      <Heading mb={4}>{name}</Heading>
      <Stepper index={state.step} size={'sm'}>
        {steps.map(({ index }) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Button onClick={() => dispatch(incStep())}>Step: {state.step}</Button>
      Streaming: {state.originStreamingType}
      PlayList: {state.playlistsIds[0]}
    </Container>
  )
}
