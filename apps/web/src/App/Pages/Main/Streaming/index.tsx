import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
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
import { useImportToast } from '../../../../hooks/useImportToast.ts'

export const Streaming: FC = () => {
  const [importPlaylists, importResult] = useImportPlaylistsMutation()
  const { t, d } = useLocalization()
  const { streamingByType } = useOutletContext<TOutletContext>()

  useImportToast(
    {
      isSuccess: importResult.isSuccess,
      isError: importResult.isError,
    },
    {
      title: {
        error: t(d.ImportError),
        success: t(d.ImportSuccess),
      },
      description: {
        error: t(d.ImportErrorMessage),
        success: t(d.ImportPlaylistsSuccessMessage, {
          exported: importResult.data?.exported || '0',
          saved: importResult.data?.saved || '0',
        }),
      },
    },
  )

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
