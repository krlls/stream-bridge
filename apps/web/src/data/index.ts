import { combineReducers } from '@reduxjs/toolkit'

import counterReducer, { streamingApi } from './streaming'
import userReducer, { userApi } from './user'
import { musicApi } from './music'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,

  [streamingApi.reducerPath]: streamingApi.reducer,
  [musicApi.reducerPath]: musicApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

const rootApiMiddleware = [streamingApi.middleware, musicApi.middleware, userApi.middleware]

export { rootReducer, rootApiMiddleware }
