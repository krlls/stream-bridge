import { FC, ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { VerticalSidebar } from '../../../components/VerticalSidebar'
import { Page } from '../../../components/Page'
import { MainHeader } from '../../../components/MainHeader'
import { variants } from '../../../utils/size'
import { useThemeColors } from '../../../hooks/useThemeColors'
import { UserStreamings } from '../../../components/UserStreamings'

export type TProps = {
  children?: ReactNode,
}

export const Main: FC<TProps> = () => {
  const { primary, secondary } = useThemeColors()

  return (
    <Page>
      <VerticalSidebar>
        <UserStreamings />
      </VerticalSidebar>
      <Flex flex={1} background={primary} direction={'column'}>
        <Box top={0} position='sticky' zIndex={2}>
          <MainHeader />
        </Box>
        <Flex
          flex={1}
          background={secondary}
          px={variants(0, 4)}
          pt={4}
          rounded={variants('0', '2xl')}
          roundedBottom={0}
        >
          <Outlet />
        </Flex>
      </Flex>
    </Page>
  )
}
