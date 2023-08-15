import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import { Api } from 'api-types'

import { PlaylistSubHeader } from '../../../../components/PlaylistSubHeader'
import { useGetPlaylistByIdQuery, useGetTracksByPlaylistQuery } from '../../../../data/music'
import { useSafeParams } from '../../../../hooks/useSafeParams.ts'
import { useImportTracksByPlaylistMutation } from '../../../../data/streaming'
import { useImportToast } from '../../../../hooks/useImportToast.ts'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { TracksList } from '../../../../components/TracksLIst'

export const Playlist: FC = () => {
  const { type, id } = useSafeParams<{ id: string, type: Api.Streaming.EApiStreamingType }>()
  const playlistId = +id
  const { data, isError, isLoading } = useGetPlaylistByIdQuery({ streamingType: type, id: playlistId })
  const { data: tracksData } = useGetTracksByPlaylistQuery({ offset: 0, streamingType: type, playlistId })
  const [importTracks, importResult] = useImportTracksByPlaylistMutation()
  const { t, d } = useLocalization()

  useImportToast(
    { isError: importResult.isError, isSuccess: importResult.isSuccess },
    {
      title: { success: t(d.ImportSuccess), error: t(d.ImportError) },
      description: {
        success: t(d.ImportTracksSuccessMessage, {
          exported: importResult.data?.exported || '0',
          saved: importResult.data?.saved || '0',
        }),
        error: t(d.ImportErrorMessage),
      },
    },
  )

  if (isError || isLoading) {
    return <Spinner />
  }

  if (!data) {
    return <Navigate to='/' replace />
  }

  const { name, cover } = data

  return (
    <Flex flexGrow={1} direction='column'>
      <PlaylistSubHeader
        title={name}
        cover={cover}
        tracks={tracksData?.items.length || 0}
        isImporting={importResult.isLoading}
        onImport={() => importTracks({ playlistId })}
      />
      <TracksList tracks={tracksData?.items || []} cover={cover} isLoading={false}/>
    </Flex>
  )
}
