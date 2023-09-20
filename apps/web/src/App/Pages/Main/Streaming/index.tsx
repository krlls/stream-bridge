import { FC, useMemo } from 'react'
import { Flex } from '@chakra-ui/react'
import { useOutletContext } from 'react-router-dom'
import { capitalize } from 'lodash'

import { useImportAllMediaMutation, useImportPlaylistsMutation } from '../../../../data/streaming'
import { Playlists } from '../../../../components/Playlists'
import { StreamingSubHeader } from '../../../../components/StreamingSubHeader'
import { streamingToLogo } from '../../../../utils/image.ts'
import { convertStreamingType } from '../../../../utils/api.ts'
import { useLocalization } from '../../../../hooks/useLocalization.ts'
import { TOutletContext } from '../../../../components/StreamingLayout'
import { useImportToast } from '../../../../hooks/useImportToast.ts'

export const Streaming: FC = () => {
  const [importPlaylists, importResult] = useImportPlaylistsMutation()
  const [importMedia, importMediaResult] = useImportAllMediaMutation()
  const { t, d } = useLocalization()
  const { streamingByType } = useOutletContext<TOutletContext>()
  const apiStreamingType = useMemo(() => convertStreamingType(streamingByType.type).toApi(), [streamingByType.type])

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
    <Flex flex={1} direction='column'>
      <StreamingSubHeader
        onImport={() => importPlaylists({ streamingType: apiStreamingType })}
        onImportMedia={() => importMedia({ streamingType: apiStreamingType })}
        isImporting={importResult.isLoading || importMediaResult.isLoading}
        title={capitalize(streamingByType.type)}
        playlists={streamingByType.playlists}
        tracks={streamingByType.tracks}
        logo={streamingToLogo(streamingByType.type)}
        type={streamingByType.type}
      />
      <Playlists streaming={convertStreamingType(streamingByType.type).toApi()} />
    </Flex>
  )
}
