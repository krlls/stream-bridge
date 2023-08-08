import { FC } from 'react'
import { Api } from 'api-types'
import { Skeleton, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'

import { PlaylistCard } from '../PlaylistCard'
import { variants } from '../../utils/size.ts'

export type TProps = {
  isLoading: boolean,
  isError: boolean,
  playlists?: Api.Music.Playlists.Playlist[],
}

const PLAYLIST_TO_LOADING = 10

export const ListOfPlaylists: FC<TProps> = ({ playlists = [], isError, isLoading }) => {
  const list =
    isLoading || isError
      ? Array(PLAYLIST_TO_LOADING)
          .fill(null)
          .map((_, i) => (
            <Skeleton
              flex={variants('40%', 'none')}
              width={variants('100%', '200px')}
              height={variants('250px', '270px')}
              minHeight={variants('250px', '250px')}
              key={i + faker.music.songName()}
              rounded='md'
            />
          ))
      : playlists.map(({ id, name, cover }) => <PlaylistCard key={id + name} id={id} name={name} cover={cover} />)

  return (
    <Stack
      pb={8}
      display='flex'
      spacing={6}
      direction='row'
      flexWrap='wrap'
      alignItems={variants('center', 'flex-start')}
    >
      {list}
    </Stack>
  )
}
