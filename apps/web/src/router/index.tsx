import { Center } from '@chakra-ui/react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { App } from '../App/App.tsx'
import { Auth } from '../App/Pages/Auth'
import { SignIn } from '../App/Pages/Auth/SignIn'
import { Main } from '../App/Pages/Main'
import { AuthLayout } from '../components/AuthLayout'
import { SignUp } from '../App/Pages/Auth/SignUp'
import { HelpCard } from '../components/HelpCard'
import { Playlists } from '../components/Playlists'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '*',
        element: <Navigate to='/' replace />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            element: <Main />,
            children: [
              {
                index: true,
                element: (
                  <Center flex={1}>
                    <HelpCard />
                  </Center>
                ),
              },
              {
                path: '/streaming/:type',
                element: <Playlists />,
              },
            ],
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthLayout auth={false} />,
        children: [
          {
            element: <Auth />,
            children: [
              {
                path: 'sign-in',
                element: <SignIn />,
              },
              {
                path: 'sign-up',
                element: <SignUp />,
              },
            ],
          },
        ],
      },
    ],
  },
])
