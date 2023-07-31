import { FC } from 'react'
import { Spinner, Text } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'

import { useGetStreamingListQuery } from '../../data/streaming'

export const Playlists: FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const { type } = useParams()

  if (isError) {
    return <Navigate to='/' replace />
  }

  if (isLoading || !data) {
    return <Spinner />
  }

  if (!data?.items.find((s) => s.type.toLowerCase() === type)) {
    return <Navigate to='/' replace />
  }

  return <Text>Playlists cmp {type}</Text>
}
