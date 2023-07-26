import { createBrowserRouter } from 'react-router-dom'

import { store } from '../store/configureStore.ts'
import { streamingApi } from '../data/counter'
import App from '../app/App.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      const p = store.dispatch(streamingApi.endpoints.getAvailableStreamings.initiate(''))

      return p.unwrap()
    },
  },
])
