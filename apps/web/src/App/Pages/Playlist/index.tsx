import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Box, Spinner } from '@chakra-ui/react'
import { Api } from 'api-types'

import { PlaylistSubHeader } from '../../../components/PlaylistSubHeader'
import { useGetPlaylistsByStreamingQuery, useGetTracksByPlaylistQuery } from '../../../data/music'
import { useSafeParams } from '../../../hooks/useSafeParams.ts'
import { useImportTracksByPlaylistMutation } from '../../../data/streaming'
import { useImportToast } from '../../../hooks/useImportToast.ts'
import { useLocalization } from '../../../hooks/useLocalization.ts'

export const Playlist: FC = () => {
  const { type, id } = useSafeParams<{ id: string, type: Api.Streaming.EApiStreamingType }>()
  const playlistId = +id
  const { data, isError, isLoading } = useGetPlaylistsByStreamingQuery({ streamingType: type, offset: 0 })
  const { data: tracksData } = useGetTracksByPlaylistQuery({ offset: 0, streamingType: type, playlistId })
  const [importTracks, importResult] = useImportTracksByPlaylistMutation()
  const { t, d } = useLocalization()
  const playlist = data?.items.find((p) => p.id === playlistId)

  useImportToast(
    { isError: importResult.isError, isSuccess: importResult.isSuccess },
    {
      title: { success: t(d.ImportSuccess), error: t(d.ImportError) },
      description: {
        success: t(d.ImportTracksSuccessMessage, {
          exported: importResult.data?.exported || '0',
          saved: importResult.data?.saved || '0',
        }),
        error: t(d.ImportError),
      },
    },
  )

  if (isError || isLoading) {
    return <Spinner />
  }

  if (!playlist) {
    return <Navigate to='/' replace />
  }

  const { name, cover } = playlist

  return (
    <Box flexGrow={1}>
      <PlaylistSubHeader
        title={name}
        cover={cover}
        tracks={tracksData?.items.length || 0}
        isImporting={importResult.isLoading}
        onImport={() => importTracks({ playlistId })}
      />
    </Box>
  )
}
