import { combineReducers } from '@reduxjs/toolkit'

import { api } from '../store/configureApi.ts'
import counterReducer from './streaming'
import userReducer from './user'

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  [api.reducerPath]: api.reducer,
})

const rootApiMiddleware = [api.middleware]

export { rootReducer, rootApiMiddleware }
