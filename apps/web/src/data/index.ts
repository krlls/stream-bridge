import { combineReducers } from '@reduxjs/toolkit'

import counterReducer, { streamingApi } from './streaming'
import userReducer from './user'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,

  [streamingApi.reducerPath]: streamingApi.reducer,
})

const rootApiMiddleware = [streamingApi.middleware]

export { rootReducer, rootApiMiddleware }
