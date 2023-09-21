import { FC } from 'react'
import { Flex, Heading } from '@chakra-ui/react'

import { IStrategy } from '../index.inerfaces.ts'
import { useExportMediaState } from '../../../hooks/useExportMediaState.ts'
import { incStep } from '../ExportContext/reducer.ts'
import { StepContainer } from '../steps/StepContainer'
import { Footer } from '../generic/Footer'
import { ExportStepper } from '../generic/ExportStepper'

type TProps = {
  strategy: IStrategy,
}

export const Strategy: FC<TProps> = ({ strategy }) => {
  const { state, dispatch } = useExportMediaState()
  const { name, steps } = strategy
  const stepData = strategy.steps[state.step - 1]
  const StepCmp = stepData?.cmp
  const isFinal = state.step >= steps.length

  return (
    <Flex direction='column'>
      <Heading mb={4}>{name}</Heading>
      <ExportStepper step={state.step} steps={steps} />
      {stepData && (
        <StepContainer title={stepData.title}>
          <StepCmp>
            {(isNext: boolean) => <Footer isFinal={isFinal} isNext={isNext} next={() => dispatch(incStep())} />}
          </StepCmp>
        </StepContainer>
      )}
    </Flex>
  )
}
