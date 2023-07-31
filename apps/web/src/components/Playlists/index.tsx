import { FC, useEffect } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'

import { useGetStreamingListQuery } from '../../data/streaming'
import { Section } from '../Section'
import { ListOfPlaylists } from '../ListOfPlaylists'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { useLazyGetPlaylistsByStreamingQuery } from '../../data/music'

export const Playlists: FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const [getPlaylists, result] = useLazyGetPlaylistsByStreamingQuery()
  const { type } = useParams()
  const { t, d } = useLocalization()
  const streamingByType = data?.items.find((s) => s.type.toLowerCase() === type)

  useEffect(() => {
    if (streamingByType?.type) {
      getPlaylists({ streamingType: streamingByType.type.toLowerCase(), offset: 0 })
    }
  }, [streamingByType?.type])

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
    <Section title={`${streamingByType.type[0] + streamingByType.type.toLowerCase().slice(1)} / ${t(d.Playlists)}`}>
      <ListOfPlaylists isLoading={result.isLoading} isError={isError} playlists={result.data?.items} />
    </Section>
  )
}
