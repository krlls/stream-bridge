import { injectable } from 'inversify'
import { faker } from '@faker-js/faker'

import { GetPlaylistsDTO } from '../../../../../modules/music/dtos/GetPlaylistsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'
export const PLAYLISTS = 1000

const mockPlaylists = Array(PLAYLISTS)
  .fill(null)
  .map((_e, i) => ({
    num: i,
    name: faker.lorem.words({ min: 1, max: 3 }),
    id: faker.string.uuid(),
  }))

const fakeApi = (offset: number) =>
  new Promise<Array<{ name: string, id: string, num: number }>>((resolve) =>
    resolve(mockPlaylists.slice(offset, offset + 50)),
  )

@injectable()
export class SpotifyClient implements IClient {
  playlistConverter = new PlaylistApiConverter()
  async getPlaylists(data: GetPlaylistsDTO) {
    const playlists = await fakeApi(data.offset)

    return playlists.map(this.playlistConverter.from)
  }
}
