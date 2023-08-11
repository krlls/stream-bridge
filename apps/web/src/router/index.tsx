import { Center } from '@chakra-ui/react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { App } from '../App/App.tsx'
import { Auth } from '../App/Pages/Auth'
import { SignIn } from '../App/Pages/Auth/SignIn'
import { Main } from '../App/Pages/Main'
import { AuthLayout } from '../components/AuthLayout'
import { SignUp } from '../App/Pages/Auth/SignUp'
import { HelpCard } from '../components/HelpCard'
import { Profile } from '../App/Pages/Main/Profile'
import { Streaming } from '../App/Pages/Main/Streaming'
import { Playlist } from '../App/Pages/Playlist'
import { StreamingLayout } from '../components/StreamingLayout'

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
                path: 'streaming/:type',
                element: <StreamingLayout />,
                children: [
                  {
                    index: true,
                    element: <Streaming />,
                  },
                  {
                    path: 'playlist/:id',
                    element: <Playlist />,
                  },
                ],
              },
              {
                path: '/profile',
                element: <Profile />,
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
