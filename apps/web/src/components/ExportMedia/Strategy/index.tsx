import { FC } from 'react'
import {
  Button,
  Container,
  Divider,
  DrawerFooter,
  Heading,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { IStrategy } from '../index.inerfaces.ts'
import { useExportMediaState } from '../../../hooks/useExportMediaState.ts'
import { incStep } from '../ExportContext/reducer.ts'
import { StepContainer } from '../steps/StepContainer'
import { useLocalization } from '../../../hooks/useLocalization.ts'

type TProps = {
  strategy: IStrategy,
}

export const Strategy: FC<TProps> = ({ strategy }) => {
  const { state, dispatch } = useExportMediaState()
  const { t, d } = useLocalization()

  const { name, steps } = strategy
  const stepData = strategy.steps[state.step - 1]
  const StepCmp = stepData?.cmp
  const isFinal = state.step >= steps.length

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
      {stepData && (
        <StepContainer title={stepData.title}>
          <StepCmp>
            {(isNext: boolean) => (
              <>
                <Divider mt={8} />
                <DrawerFooter>
                  {isFinal ? (
                    <Button colorScheme='green' variant='solid'>
                      {t(d.Export)}
                    </Button>
                  ) : (
                    <Button onClick={() => dispatch(incStep())} isDisabled={!isNext}>
                      {t(d.Next)} <ArrowForwardIcon ml={2} />
                    </Button>
                  )}
                </DrawerFooter>
              </>
            )}
          </StepCmp>
        </StepContainer>
      )}
    </Container>
  )
}
