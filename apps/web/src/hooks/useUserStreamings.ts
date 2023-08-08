import { useCallback } from 'react'
import { Api } from 'api-types'

import { useGetAvailableStreamingsQuery, useGetStreamingListQuery } from '../data/streaming'

export const useUserStreamings = () => {
  const {
    data: availableData,
    isLoading: isAvailableLoading,
    isError: isAvailableError,
    refetch: refetchAvailable,
  } = useGetAvailableStreamingsQuery('')
  const {
    data: listData,
    isLoading: isListLoading,
    isError: isListError,
    refetch: refetchList,
  } = useGetStreamingListQuery()

  const refetch = () => {
    refetchAvailable()
    refetchList()
  }

  const makeUserStreamings = useCallback(() => {
    const available = new Map<string, Api.Streaming.List.Streaming>()

    ;(listData?.items || []).forEach((l) => available.set(l.type, l))

    return (availableData || []).map((s) => ({ ...s, isConnected: available.has(s.type) }))
  }, [availableData, listData])

  if (isAvailableError || isListError || isAvailableLoading || isListLoading) {
    return {
      data: [],
      isError: isAvailableError || isListError,
      isLoading: isAvailableLoading || isListLoading,
      refetch,
    }
  }

  return { data: makeUserStreamings(), isError: false, isLoading: false, refetch }
}
