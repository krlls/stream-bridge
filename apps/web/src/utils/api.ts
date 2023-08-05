import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query'

export const parseErrorStatus = (resp: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>) => {
  if (!resp.error) {
    return
  }

  return typeof resp.error.status === 'number'
    ? resp.error.status
    : (resp.error.status === 'PARSING_ERROR' && resp.error.originalStatus) || resp.error.status
}
