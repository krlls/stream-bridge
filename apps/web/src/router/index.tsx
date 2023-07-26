import { createBrowserRouter } from 'react-router-dom'

import App from '../app/App.tsx'
import { streamingLoader } from './loaders.ts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: streamingLoader,
  },
])
