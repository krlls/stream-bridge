import { FC } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'
import { Api } from 'api-types'
import { capitalize } from 'lodash'

import { useGetStreamingListQuery } from '../../../data/streaming'
import { Playlists } from '../../../components/Playlists'
import { StreamingSubHeader } from '../../../components/StreamingSubHeader'
import { streamingToLogo } from '../../../utils/image.ts'

export const Streaming: FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const { type } = useParams()
  const streamingByType = data?.items.find((s) => s.type.toLowerCase() === type)

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
        title={capitalize(streamingByType.type)}
        playlists={streamingByType.playlists}
        tracks={streamingByType.tracks}
        logo={streamingToLogo(streamingByType.type)}
      />
      <Playlists streaming={streamingByType.type.toLowerCase() as Api.Streaming.EApiStreamingType} />
    </Flex>
  )
}
