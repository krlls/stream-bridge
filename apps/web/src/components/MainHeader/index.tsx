import { FC } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { Header } from '../Header'
import { AppDrawer } from '../AppDrawer'
import { StreamingList } from '../StreamingList'
import { useGetStreamingListQuery } from '../../data/streaming'

export const MainHeader: FC = () => {
  const { data, isLoading, isError } = useGetStreamingListQuery()

  const headerMenu = (
    <AppDrawer trigger={<HamburgerIcon />}>
      <StreamingList data={data} isLoading={isLoading} isError={isError} />
    </AppDrawer>
  )

  return <Header mobileMenu={headerMenu} />
}
