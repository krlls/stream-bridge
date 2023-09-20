import { createContext, Dispatch } from 'react'

import { IState, makeDefaultState, TExportActions } from './reducer.ts'

export const exportDataContext = createContext<IState>(makeDefaultState())
export const exportDataContextDispatch = createContext<Dispatch<TExportActions>>(() => null)
