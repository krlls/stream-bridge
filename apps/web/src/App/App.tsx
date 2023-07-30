import './App.css'
import { ReactNode, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react'

import theme from '../theme'

export type TProps = {
  children?: ReactNode,
}

export const App: FC<TProps> = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Flex direction='column' height='100%'>
          <Outlet />
        </Flex>
      </ChakraProvider>
    </>
  )
}
