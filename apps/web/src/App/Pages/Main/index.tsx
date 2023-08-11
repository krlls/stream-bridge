import { FC, ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { VerticalSidebar } from '../../../components/VerticalSidebar'
import { Page } from '../../../components/Page'
import { MainHeader } from '../../../components/MainHeader'
import { variants } from '../../../utils/size'
import { useThemeColors } from '../../../hooks/useThemeColors'
import { UserStreamings } from '../../../components/UserStreamings'
import { useGetRef } from '../../../hooks/useGetRef'

export type TProps = {
  children?: ReactNode,
}

export const Main: FC<TProps> = () => {
  const { primary, secondary } = useThemeColors()
  const ref = useGetRef<HTMLDivElement>()

  return (
    <Page
      header={
        <div>
          <MainHeader />
        </div>
      }
    >
      <VerticalSidebar>
        <UserStreamings />
      </VerticalSidebar>
      <Flex flex={1} background={primary}>
        <Flex
          ref={ref}
          height={`calc(100vh - ${ref.current?.getBoundingClientRect().top || 64}px)`}
          overflowY={'auto'}
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
