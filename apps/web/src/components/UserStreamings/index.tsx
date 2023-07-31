import React from 'react'

import { StreamingList } from '../StreamingList'
import { useGetStreamingListQuery } from '../../data/streaming'

export const UserStreamings: React.FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()

  return <StreamingList isLoading={isLoading} isError={isError} data={data} />
}
