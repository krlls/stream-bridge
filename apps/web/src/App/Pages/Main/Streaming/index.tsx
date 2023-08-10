import { FC, useEffect } from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { Api } from 'api-types'
import { capitalize } from 'lodash'

import { useImportPlaylistsMutation } from '../../../../data/streaming'
import { Playlists } from '../../../../components/Playlists'
import { StreamingSubHeader } from '../../../../components/StreamingSubHeader'
import { streamingToLogo } from '../../../../utils/image.ts'
import { convertStreamingType } from '../../../../utils/api.ts'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { TOutletContext } from '../../../../components/StreamingLayout'

export const Streaming: FC = () => {
  const [importPlaylists, importResult] = useImportPlaylistsMutation()
  const { t, d } = useLocalization()
  const toast = useToast()
  const { streamingByType } = useOutletContext<TOutletContext>()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importResult.isSuccess, importResult.isError])

  return (
    <Flex direction='column'>
      <StreamingSubHeader
        onImport={() => importPlaylists({ streamingType: convertStreamingType(streamingByType.type).toApi() })}
        isImporting={importResult.isLoading}
        title={capitalize(streamingByType.type)}
        playlists={streamingByType.playlists}
        tracks={streamingByType.tracks}
        logo={streamingToLogo(streamingByType.type)}
      />
      <Playlists streaming={streamingByType.type.toLowerCase() as Api.Streaming.EApiStreamingType} />
    </Flex>
  )
}
