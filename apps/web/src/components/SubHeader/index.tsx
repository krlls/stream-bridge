import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { useThemeColors } from '../../hooks/useThemeColors.ts'

interface TProps {
  children?: ReactNode,
}

export const SubHeader: FC<TProps> = ({ children }) => {
  const { primary, secondary } = useThemeColors()

  return (
    <Flex width='100%' bgGradient={`linear(to-b, ${primary}, ${secondary} 80%)`} rounded='xl'>
      {children}
    </Flex>
  )
}
