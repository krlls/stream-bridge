import { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Flex, Spinner } from '@chakra-ui/react'
import { uniqBy } from 'lodash'
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
  const { data: PlaylistsData, isError, isLoading } = useGetPlaylistByIdQuery({ streamingType: type, id: playlistId })
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

  const pageSize = 50
  const [currentPage, setCurrentPage] = useState(0)
  const [combined, setCombined] = useState<Api.Music.Track[]>([])

  const {
    data: tracksData,
    isFetching: isTracksFetching,
    isLoading: isTracksLoading,
  } = useGetTracksByPlaylistQuery(
    { offset: currentPage * pageSize, streamingType: type, playlistId },
    { skip: combined.length % pageSize !== 0 },
  )

  useEffect(() => {
    setCombined((prevState) => uniqBy([...prevState, ...(tracksData?.items || [])], 'id'))
  }, [tracksData?.items])

  if (isError || isLoading) {
    return <Spinner />
  }

  if (!PlaylistsData) {
    return <Navigate to='/' replace />
  }

  const { name, cover } = PlaylistsData

  return (
    <Flex flexGrow={1} direction='column'>
      <PlaylistSubHeader
        title={name}
        cover={cover}
        tracks={combined?.length || 0}
        isImporting={importResult.isLoading}
        onImport={() => importTracks({ playlistId })}
      />
      <TracksList
        tracks={combined || []}
        cover={cover}
        isLoading={isTracksLoading}
        isFetching={isTracksFetching}
        setPage={() => setCurrentPage(currentPage + 1)}
      />
    </Flex>
  )
}
