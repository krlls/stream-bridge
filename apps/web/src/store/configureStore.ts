import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/es/types'

import { rootApiMiddleware, rootReducer } from '../data'
import { EStoreNames } from '../data/types.ts'

export type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  version: 1,
  storage,
  whitelist: [EStoreNames.USER],
}

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(rootApiMiddleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
