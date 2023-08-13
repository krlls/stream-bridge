import { useMemo } from 'react'

import { useGetStreamingListQuery } from '../data/streaming'

export const useGetCalculatedUserStats = () => {
  const { data, isLoading, isError } = useGetStreamingListQuery()
  const result = useMemo(() => {
    if (!data) {
      return undefined
    }

    return data.items.reduce(
      (res, { tracks, playlists }) => {
        return {
          streamings: res.streamings + 1,
          playlists: res.playlists + playlists,
          tracks: res.tracks + tracks,
        }
      },
      { streamings: 0, playlists: 0, tracks: 0 },
    )
  }, [data])

  return { result, isLoading, isError }
}
