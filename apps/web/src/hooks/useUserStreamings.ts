import { useCallback } from 'react'
import { Api } from 'api-types'

import { useGetAvailableStreamingsQuery, useGetStreamingListQuery } from '../data/streaming'

export const useUserStreamings = () => {
  const {
    data: availableData,
    isLoading: isAvailableLoading,
    isError: isAvailableError,
  } = useGetAvailableStreamingsQuery('')
  const { data: listData, isLoading: isListLoading, isError: isListError } = useGetStreamingListQuery()

  const makeUserStreamings = useCallback(() => {
    const available = new Map<string, Api.Streaming.List.Streaming>()

    ;(listData?.items || []).forEach((l) => available.set(l.type, l))

    return (availableData || []).map((s) => ({ ...s, isConnected: available.has(s.type) }))
  }, [availableData, listData])

  if (isAvailableError || isListError || isAvailableLoading || isListLoading) {
    return { data: [], isError: isAvailableError || isListError, isLoading: isAvailableLoading || isListLoading }
  }

  return { data: makeUserStreamings(), isError: false, isLoading: false }
}
