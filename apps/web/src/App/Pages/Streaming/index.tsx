import { FC, useEffect } from 'react'
import { Flex, Spinner, useToast } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'
import { Api } from 'api-types'
import { capitalize } from 'lodash'

import { useGetStreamingListQuery, useImportPlaylistsMutation } from '../../../data/streaming'
import { Playlists } from '../../../components/Playlists'
import { StreamingSubHeader } from '../../../components/StreamingSubHeader'
import { streamingToLogo } from '../../../utils/image.ts'
import { convertStreamingType } from '../../../utils/api.ts'
import { useLocalization } from '../../../hooks/useLocalization.ts'

export const Streaming: FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const [importPlaylists, importResult] = useImportPlaylistsMutation()
  const { t, d } = useLocalization()
  const { type } = useParams()
  const toast = useToast()

  const streamingByType = data?.items.find((s) => s.type.toLowerCase() === type)

  useEffect(() => {
    if (!importResult.isSuccess && !importResult.isError) {
      return
    }

    toast({
      title: importResult.isSuccess ? t(d.ImportPlaylistsSuccess) : t(d.ImportPlaylistsError),
      description: importResult.isSuccess
        ? t(d.ImportPlaylistsSuccessMessage, { exported: importResult.data.exported, saved: importResult.data.saved })
        : t(d.ImportPlaylistsErrorMessage),
      status: importResult.isSuccess ? 'success' : 'error',
      duration: 5000,
      isClosable: true,
    })
  }, [importResult.isSuccess, importResult.isError])

  if (isError) {
    return <Navigate to='/' replace />
  }

  if (isLoading || !data) {
    return <Spinner />
  }

  if (!streamingByType) {
    return <Navigate to='/' replace />
  }

  return (
    <Flex direction='column'>
      <StreamingSubHeader
        onImport={() => importPlaylists({ streamingType: convertStreamingType(streamingByType.type).toApi() })}
        isImporting={importResult.isLoading || importResult.isError}
        title={capitalize(streamingByType.type)}
        playlists={streamingByType.playlists}
        tracks={streamingByType.tracks}
        logo={streamingToLogo(streamingByType.type)}
      />
      <Playlists streaming={streamingByType.type.toLowerCase() as Api.Streaming.EApiStreamingType} />
    </Flex>
  )
}
