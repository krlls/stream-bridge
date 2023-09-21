import { Api } from 'api-types'
import { FC } from 'react'
import { Container } from '@chakra-ui/react'

import { CardItem } from '../CardItem'

type TProps = {
  targetPlaylists: number[],
  onClick: (type: number) => void,
  playlists: Api.Music.Playlist[],
}

export const SelectPlaylistList: FC<TProps> = ({ targetPlaylists, onClick, playlists }) => {
  return (
    <Container>
      {playlists.map(({ id, name, cover }) => (
        <CardItem
          isSelected={targetPlaylists.includes(id)}
          title={name}
          image={cover}
          key={id}
          onClick={() => onClick(id)}
        />
      ))}
    </Container>
  )
}
