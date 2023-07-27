import './App.css'
import { ReactNode, FC } from 'react'
import { Outlet } from 'react-router-dom'

export type TProps = {
  children?: ReactNode,
}

export const App: FC<TProps> = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
