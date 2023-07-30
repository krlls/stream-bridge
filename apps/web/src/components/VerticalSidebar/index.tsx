import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

import { variants } from '../../utils/size.ts'
import { useThemeColors } from '../../hooks/useThemeColors.ts'

type TProps = {
  children: ReactNode,
}

export const VerticalSidebar: FC<TProps> = ({ children }) => {
  const { primary } = useThemeColors()

  return (
    <Flex
      display={variants('none', 'flex')}
      bg={primary}
      p={4}
      minWidth='90px'
      maxWidth='100'
      overflow='hidden'
      overflowY='auto'
    >
      {children}
    </Flex>
  )
}
