import { FC, ReactNode, useReducer } from 'react'

import { exportReducer, IState, makeDefaultState } from './reducer.ts'
import { exportDataContext, exportDataContextDispatch } from './context.ts'

export type TProps = {
  children?: ReactNode,
} & Partial<IState>

export const ExportContextProvider: FC<TProps> = ({ children, ...newState }) => {
  const defState = makeDefaultState(newState)
  const [state, dispatch] = useReducer(exportReducer, defState)

  return (
    <exportDataContext.Provider value={state}>
      <exportDataContextDispatch.Provider value={dispatch}>{children}</exportDataContextDispatch.Provider>
    </exportDataContext.Provider>
  )
}
