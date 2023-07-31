import { FC } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'

import { useGetStreamingListQuery } from '../../data/streaming'
import { ListOfPlaylists } from '../ListOfPlaylists'

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

  return <ListOfPlaylists isLoading={true} isError={false} />
}
