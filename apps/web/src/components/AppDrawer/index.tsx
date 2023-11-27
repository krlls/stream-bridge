import { FC, ReactNode, useRef } from 'react'
import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'

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
        <DrawerContent maxW='100px'>
          <DrawerHeader p={0}>{title}</DrawerHeader>
          <DrawerBody p={0}>
            <Box pt={3} onClick={onClose}>
              {children}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
