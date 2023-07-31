import { FC, ReactNode } from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import * as CSS from 'csstype'

import { VerticalSidebar } from '../../../components/VerticalSidebar'
import { Page } from '../../../components/Page'
import { MainHeader } from '../../../components/MainHeader'
import { variants } from '../../../utils/size.ts'
import { useThemeColors } from '../../../hooks/useThemeColors.ts'
import { UserStreamings } from '../../../components/UserStreamings'

export type TProps = {
  children?: ReactNode,
}

export const Main: FC<TProps> = () => {
  const { primary } = useThemeColors()

  return (
    <Page header={<MainHeader />}>
      <VerticalSidebar>
        <UserStreamings />
      </VerticalSidebar>
      <Flex flex={1} background={primary}>
        <Flex
          flex={1}
          background={useColorModeValue('white', 'gray.800')}
          roundedTopStart={variants('lg', '2xl')}
          roundedTopEnd={variants<CSS.Property.BorderRadius>('lg', 0)}
        ></Flex>
      </Flex>
    </Page>
  )
}
