import { FC } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { Header } from '../Header'
import { AppDrawer } from '../AppDrawer'
import { UserStreamings } from '../UserStreamings'

export const MainHeader: FC = () => {
  const headerMenu = (
    <AppDrawer trigger={<HamburgerIcon />}>
      <UserStreamings />
    </AppDrawer>
  )

  return <Header mobileMenu={headerMenu} />
}
