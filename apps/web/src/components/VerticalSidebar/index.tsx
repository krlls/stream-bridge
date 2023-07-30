import { FC, ReactNode } from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'

type TProps = {
  children: ReactNode,
}

export const VerticalSidebar: FC<TProps> = ({ children }) => {
  return (
    <Flex bg={useColorModeValue('gray.100', 'gray.900')} p={4} width={20}>
      {children}
    </Flex>
  )
}
