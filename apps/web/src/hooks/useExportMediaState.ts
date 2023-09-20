import { useContext } from 'react'

import { exportDataContext, exportDataContextDispatch } from '../components/ExportMedia/ExportContext/context.ts'

export const useExportMediaState = () => ({
  state: useContext(exportDataContext),
  dispatch: useContext(exportDataContextDispatch),
})
