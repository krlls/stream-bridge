import React from 'react'
import { useNavigate } from 'react-router-dom'

import { StreamingList } from '../StreamingList'
import { useGetStreamingListQuery } from '../../data/streaming'
import { convertStreamingType } from '../../utils/api.ts'

export const UserStreamings: React.FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const navigate = useNavigate()

  return (
    <StreamingList
      isLoading={isLoading}
      isError={isError}
      data={data}
      onEnter={(type) => navigate(`/streaming/${convertStreamingType(type).toApi()}`)}
    />
  )
}
