import { FC } from 'react'
import { Api } from 'api-types'
import { capitalize } from 'lodash'

import { Section } from '../Section'
import { ListOfPlaylists } from '../ListOfPlaylists'
import { useLocalization } from '../../hooks/useLocalization.ts'
import { useGetPlaylistsByStreamingQuery } from '../../data/music'

export type TProps = {
  streaming: Api.Streaming.EApiStreamingType,
}

export const Playlists: FC<TProps> = ({ streaming }) => {
  const { isError, data, isLoading } = useGetPlaylistsByStreamingQuery({ streamingType: streaming, offset: 0 })
  const { t, d } = useLocalization()

  return (
    <Section title={`${capitalize(streaming)} / ${t(d.Playlists)}`}>
      <ListOfPlaylists isLoading={isLoading} isError={isError} playlists={data?.items} />
    </Section>
  )
}
