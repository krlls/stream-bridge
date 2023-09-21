import { FC } from 'react'
import { Button, Divider, DrawerFooter } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

import { useLocalization } from '../../../../hooks/useLocalization.ts'

type TProps = {
  isNext: boolean,
  isFinal: boolean,
  next: VoidFunction,
}

export const Footer: FC<TProps> = ({ isNext, isFinal, next }) => {
  const { t, d } = useLocalization()

  return (
    <>
      <Divider mt={8} />
      <DrawerFooter>
        {isFinal ? (
          <Button colorScheme='green' variant='solid'>
            {t(d.Export)}
          </Button>
        ) : (
          <Button onClick={next} isDisabled={!isNext}>
            {t(d.Next)} <ArrowForwardIcon ml={2} />
          </Button>
        )}
      </DrawerFooter>
    </>
  )
}
