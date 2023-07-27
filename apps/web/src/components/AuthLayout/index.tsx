import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { RootState } from '../../store/configureStore.ts'

export type TProps = {
  auth?: boolean,
}

export const AuthLayout: FC<TProps> = ({ auth = true }) => {
  const token = useSelector((state: RootState) => state.user.token)

  if (auth && !token) {
    return <Navigate to={'/auth/sign-in'} replace />
  }

  if (!auth && token) {
    return <Navigate to={'/'} replace />
  }

  return <Outlet />
}
