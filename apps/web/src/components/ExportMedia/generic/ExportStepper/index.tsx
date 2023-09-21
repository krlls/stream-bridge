import { FC } from 'react'
import { Step, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus } from '@chakra-ui/react'

import { Step as IStep } from '../../index.inerfaces.ts'

export type TProps = {
  step: number,
  steps: IStep<any>[],
}

export const ExportStepper: FC<TProps> = ({ steps, step }) => {
  return (
    <Stepper index={step} size={'sm'}>
      {steps.map(({ index }) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
