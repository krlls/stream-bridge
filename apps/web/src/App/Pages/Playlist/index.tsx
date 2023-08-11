import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, Spinner } from '@chakra-ui/react'
import { Api } from 'api-types'

import { PlaylistSubHeader } from '../../../components/PlaylistSubHeader'
import { useGetPlaylistsByStreamingQuery, useGetTracksByPlaylistQuery } from '../../../data/music'
import { useSafeParams } from '../../../hooks/useSafeParams.ts'

export const Playlist: FC = () => {
  const { type, id } = useSafeParams<{ id: string, type: Api.Streaming.EApiStreamingType }>()
  const { data, isError, isLoading } = useGetPlaylistsByStreamingQuery({ streamingType: type, offset: 0 })
  const { data: tracksData } = useGetTracksByPlaylistQuery({ offset: 0, streamingType: type, playlistId: +id })

  const playlist = data?.items.find((p) => p.id === +id)

  if (isError || isLoading) {
    return <Spinner />
  }

  if (!playlist) {
    return <Navigate to='/' replace />
  }

  const { name, cover } = playlist

  return (
    <Box flexGrow={1}>
      <PlaylistSubHeader title={name} cover={cover} tracks={tracksData?.items.length || 0} isImporting={false} />
    </Box>
  )
}
