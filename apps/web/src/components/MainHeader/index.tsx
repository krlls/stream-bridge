import { FC } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { Header } from '../Header'
import { AppDrawer } from '../AppDrawer'
import { StreamingList } from '../StreamingList'

export const MainHeader: FC = () => {
  const headerMenu = (
    <AppDrawer trigger={<HamburgerIcon />}>
      <StreamingList />
    </AppDrawer>
  )

  return <Header mobileMenu={headerMenu} />
}
