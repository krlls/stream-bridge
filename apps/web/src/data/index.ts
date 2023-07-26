import { combineReducers } from '@reduxjs/toolkit'

import counterReducer, { streamingApi } from './counter'
import userReducer, { userApi } from './user'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,

  [streamingApi.reducerPath]: streamingApi.reducer,
})

const rootApiMiddleware = [streamingApi, userApi].map((api) => api.middleware)

export { rootReducer, rootApiMiddleware }
