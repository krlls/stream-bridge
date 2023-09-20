import { FC, ReactNode, useReducer } from 'react'

import { defaultState, exportReducer } from './reducer.ts'
import { exportDataContext, exportDataContextDispatch } from './context.ts'

export type TProps = {
  children?: ReactNode,
}

export const ExportContextProvider: FC<TProps> = ({ children }) => {
  const [state, dispatch] = useReducer(exportReducer, defaultState)

  return (
    <exportDataContext.Provider value={state}>
      <exportDataContextDispatch.Provider value={dispatch}>{children}</exportDataContextDispatch.Provider>
    </exportDataContext.Provider>
  )
}
