import './App.css'
import { ReactNode, FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import theme from '../theme'

export type TProps = {
  children?: ReactNode,
}

export const App: FC<TProps> = () => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Box height='100%'>
          <Outlet />
        </Box>
      </ChakraProvider>
    </>
  )
}
