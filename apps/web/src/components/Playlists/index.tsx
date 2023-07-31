import { FC } from 'react'
import { Spinner } from '@chakra-ui/react'
import { Navigate, useParams } from 'react-router-dom'

import { useGetAvailableStreamingsQuery, useGetStreamingListQuery } from '../../data/streaming'
import { Section } from '../Section'
import { ListOfPlaylists } from '../ListOfPlaylists'
import { useLocalization } from '../../hooks/useLocalization.ts'

export const Playlists: FC = () => {
  const { data, isError, isLoading } = useGetStreamingListQuery()
  const { data: AvailableData } = useGetAvailableStreamingsQuery('')
  const { type } = useParams()
  const { t, d } = useLocalization()

  if (isError) {
    return <Navigate to='/' replace />
  }

  if (isLoading || !data || !AvailableData) {
    return <Spinner />
  }

  if (!data?.items.find((s) => s.type.toLowerCase() === type)) {
    return <Navigate to='/' replace />
  }

  const streaming = AvailableData.find((a) => a.type.toLowerCase() === type?.toLowerCase())

  if (!streaming) {
    return <Navigate to='/' replace />
  }

  return (
    <Section title={`${streaming.name} / ${t(d.Playlists)}`}>
      <ListOfPlaylists isLoading={true} isError={false} />
    </Section>
  )
}
