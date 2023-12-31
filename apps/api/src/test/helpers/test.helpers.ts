import { faker } from '@faker-js/faker'
import { PlaylistedTrack } from '@spotify/web-api-ts-sdk/src/types'
import { Api } from 'api-types'

import { createPatch } from '../../utils/links'
import { CreateTrackDTO } from '../../modules/music/dtos/CreateTrackDTO'
import { CreatePlaylistDTO } from '../../modules/music/dtos/CreatePlaylistDTO'
import { EStreamingType } from '../../types/common'
import { CreateStreamingDTO } from '../../modules/streaming/dtos/CreateStreamingDTO'
import { genUid } from '../../utils/app'
import { calcExpires } from '../../utils/transform'

export const userUrl: (...args: string[]) => string = createPatch.bind(null, Api.User.PREFIX)
export const authUrl: (...args: string[]) => string = createPatch.bind(null, Api.Auth.PREFIX)
export const streamingUrl: (...args: string[]) => string = createPatch.bind(null, Api.Streaming.PREFIX)
export const importUrl: (...args: string[]) => string = createPatch.bind(null, Api.Import.PREFIX)
export const musicUrl: (...args: string[]) => string = createPatch.bind(null, Api.Music.PREFIX)

export const testUserData = {
  login: 'Ksmi',
  name: 'Kirill',
  pass: '123',
}

export const testPlaylistDTO = (userId: number, streamingId: number) =>
  new CreatePlaylistDTO({
    userId,
    name: 'Test playlist',
    externalId: '65FD4G65SF',
    streamingId,
    importId: genUid(),
  })

export const testTrackDTO = (userId: number, playlistId: number) =>
  new CreateTrackDTO({
    userId,
    playlistId,
    externalId: 'AAAAAAAAA',
    name: 'Test track',
    artist: 'Test artist',
    album: 'Test album',
    importId: genUid(),
  })

export const testRandomTrackDTO = (userId: number, playlistId: number) =>
  new CreateTrackDTO({
    userId,
    playlistId,
    externalId: faker.string.uuid(),
    name: faker.music.songName(),
    artist: faker.person.fullName(),
    album: faker.lorem.words({ min: 2, max: 3 }),
    importId: genUid(),
  })

export const testStreamingDTO = (userId: number, type?: EStreamingType) =>
  new CreateStreamingDTO({
    userId,
    token: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    type: type || EStreamingType.SPOTIFY,
    expiresIn: 3600,
    expires: calcExpires(3600),
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
        importId: '24',
      }),
  )

export const PLAYLISTS = 50
export const TRACKS = 150

export const fakeApi = () => {
  const mockPlaylists = Array(PLAYLISTS)
    .fill(null)
    .map((_e, i) => ({
      num: i,
      name: faker.lorem.words({ min: 1, max: 3 }),
      id: faker.string.uuid(),
    }))

  const mockTracks = new Map()

  mockPlaylists.forEach((p) =>
    mockTracks.set(
      p.id,
      Array(TRACKS)
        .fill(null)
        .map((_e) => ({
          track: {
            id: faker.string.uuid(),
            name: faker.music.songName(),
            album: {
              name: faker.person.fullName(),
              album_group: faker.lorem.words({ min: 2, max: 3 }),
            },
          },
        })),
    ),
  )

  return {
    getPlaylists: (limit: number, offset: number) =>
      new Promise<Array<{ name: string, id: string }>>((resolve) =>
        resolve(mockPlaylists.slice(offset, offset + limit)),
      ),
    getTracks: (playlist: string, limit: number, offset: number) =>
      new Promise<PlaylistedTrack[]>((resolve) => {
        const tracks = mockTracks.get(playlist)
        !tracks ? resolve([]) : resolve(tracks.slice(offset, offset + limit))
      }),
  }
}
