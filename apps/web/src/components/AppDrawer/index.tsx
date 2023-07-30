import { FC, ReactNode, useRef } from 'react'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'

export type TProps = {
  title?: string,
  children?: ReactNode,
  trigger: ReactNode,
}

export const AppDrawer: FC<TProps> = ({ children, title, trigger }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Box ref={btnRef} onClick={onOpen} cursor='pointer'>
        {trigger}
      </Box>
      <Drawer isOpen={isOpen} placement='left' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
