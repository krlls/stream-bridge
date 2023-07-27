import { FC, ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type TProps = {
  children?: ReactNode,
}

export const Auth: FC<TProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
