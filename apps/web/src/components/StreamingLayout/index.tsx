import { FC } from 'react'
import { Center, Spinner } from '@chakra-ui/react'
import { Api } from 'api-types'
import { Navigate, Outlet, useParams } from 'react-router-dom'

import { useGetStreamingListQuery } from '../../data/streaming'

export type TOutletContext = {
  streamingByType: Api.Streaming.List.Streaming,
}

export const StreamingLayout: FC = () => {
  const { type } = useParams()
  const { data, isError, isLoading } = useGetStreamingListQuery()

  const streamingByType = data?.items.find((s) => s.type.toLowerCase() === type)

  if (isError) {
    return <Navigate to='/' replace />
  }

  if (isLoading || !data) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  }

  if (!streamingByType) {
    return <Navigate to='/' replace />
  }

  return <Outlet context={{ streamingByType } satisfies TOutletContext} />
}
