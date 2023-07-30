import { createBrowserRouter, Navigate } from 'react-router-dom'

import { App } from '../App/App.tsx'
import { Auth } from '../App/Pages/Auth'
import { SignIn } from '../App/Pages/Auth/SignIn'
import { Main } from '../App/Pages/Main'
import { AuthLayout } from '../components/AuthLayout'
import { SignUp } from '../App/Pages/Auth/SignUp'
import { Header } from '../components/Header'

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
            index: true,
            element: (
              <>
                <Header />
                <Main />
              </>
            ),
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
