import { createContext, Dispatch } from 'react'

import { defaultState, IState, TExportActions } from './reducer.ts'

export const exportDataContext = createContext<IState>(defaultState)
export const exportDataContextDispatch = createContext<Dispatch<TExportActions>>(() => null)
