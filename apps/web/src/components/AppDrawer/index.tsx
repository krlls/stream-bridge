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
  size?: string,
  placement?: 'top' | 'left' | 'bottom' | 'right',
}

export const AppDrawer: FC<TProps> = ({ placement, children, size, title, trigger }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Box ref={btnRef} onClick={onOpen} cursor='pointer'>
        {trigger}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement={placement || 'left'}
        onClose={onClose}
        finalFocusRef={btnRef}
        size={size || 'xs'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>
          <DrawerBody>
            <Box>{children}</Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
