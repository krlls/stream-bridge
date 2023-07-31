import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Flex } from '@chakra-ui/react'
import * as CSS from 'csstype'
import { Outlet } from 'react-router-dom'

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
  const { primary, secondary } = useThemeColors()
  const ref = useRef<HTMLDivElement>(null)
  const [shouldUpdate, setShouldUpdate] = useState(true)

  useEffect(() => {
    if (shouldUpdate) setShouldUpdate(false)
  }, [shouldUpdate])

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
          p={4}
          roundedTopStart={variants('lg', '2xl')}
          roundedTopEnd={variants<CSS.Property.BorderRadius>('lg', 0)}
        >
          <Outlet />
        </Flex>
      </Flex>
    </Page>
  )
}
