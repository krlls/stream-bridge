import { FC, ReactNode } from 'react'
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'

import { useLocalization } from '../../hooks/useLocalization.ts'

export type TProps = {
  children: ReactNode,
  title: string,
  message: string,
  onOk(): void,
  onCancel?(): void,
}

export const PopoverConfirmation: FC<TProps> = ({ children, onCancel, onOk, title, message }) => {
  const { t, d } = useLocalization()

  const handleClose = (clb: VoidFunction) => () => {
    clb()
    onCancel && onCancel()
  }

  const handleOk = (clb: VoidFunction) => () => {
    clb()
    onOk()
  }

  return (
    <Popover>
      {({ onClose }) => (
        <>
          <PopoverTrigger>{children}</PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverHeader fontWeight='semibold'>{title}</PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{message}</PopoverBody>
              <PopoverFooter display='flex' justifyContent='flex-end'>
                <ButtonGroup size='sm'>
                  <Button variant='outline' onClick={handleClose(onClose)}>
                    {t(d.Cancel)}
                  </Button>
                  <Button colorScheme='blue' onClick={handleOk(onClose)}>
                    {t(d.Apply)}
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}
