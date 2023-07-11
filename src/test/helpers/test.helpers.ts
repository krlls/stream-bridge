import { faker } from '@faker-js/faker'

import { createPatch } from '../../utils/links'
import { Api } from '../../types/TApi'
import { CreateTrackDTO } from '../../modules/music/dtos/CreateTrackDTO'
import { CreatePlaylistDTO } from '../../modules/music/dtos/CreatePlaylistDTO'

export const userUrl: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)

export const authUrl: (...args: string[]) => string = createPatch.bind(null, Api.Auth.PREFIX)
export const testUserData = {
  login: 'Ksmi',
  name: 'Kirill',
  pass: '123',
}

export const testPlaylistDTO = (userId: number) =>
  new CreatePlaylistDTO({
    userId,
    name: 'Test playlist',
    externalId: '65FD4G65SF',
  })

export const testTrackDTO = (userId: number, playlistId: number) =>
  new CreateTrackDTO({
    userId,
    playlistId,
    externalId: 'AAAAAAAAA',
    name: 'Test track',
    artist: 'Test artist',
    album: 'Test album',
  })

export const getRandomTracks = ({ userId, playlistId }: { userId: number, playlistId: number }, size: number) =>
  new Array(size).fill(null).map(
    () =>
      new CreateTrackDTO({
        userId,
        playlistId,
        externalId: faker.string.uuid(),
        name: faker.music.songName(),
        artist: faker.person.fullName(),
        album: faker.lorem.words({ min: 1, max: 3 }),
      }),
  )
