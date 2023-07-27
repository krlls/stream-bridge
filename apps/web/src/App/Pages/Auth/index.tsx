import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Center } from '@chakra-ui/react'

type TProps = {
  children?: ReactNode,
}

export const Auth: FC<TProps> = () => {
  return (
    <Center width='100%' height='100%'>
      <Outlet />
    </Center>
  )
}
