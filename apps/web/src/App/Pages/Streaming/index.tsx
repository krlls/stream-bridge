import { FC } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'
import { Api } from 'api-types'

import { useGetStreamingListQuery } from '../../../data/streaming'
import { Playlists } from '../../../components/Playlists'

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
    <>
      <Playlists streaming={streamingByType.type.toLowerCase() as Api.Streaming.EApiStreamingType} />
    </>
  )
}
