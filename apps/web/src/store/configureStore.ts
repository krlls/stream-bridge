import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import counterReducer, { streamingApi } from '../data/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    [streamingApi.reducerPath]: streamingApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(streamingApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
