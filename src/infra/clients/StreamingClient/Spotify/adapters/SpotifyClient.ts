import { injectable } from 'inversify'
import { faker } from '@faker-js/faker'

import { GetPlaylistsDTO } from '../../../../../modules/music/dtos/GetPlaylistsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'

const mockPlaylists = Array(15)
  .fill(null)
  .map(() => ({
    name: faker.lorem.words({ min: 1, max: 3 }),
    id: faker.string.uuid(),
  }))

const fakeApi = () => new Promise<Array<{ name: string, id: string }>>((resolve) => resolve(mockPlaylists))

@injectable()
export class SpotifyClient implements IClient {
  playlistConverter = new PlaylistApiConverter()
  async getPlaylists(_data: GetPlaylistsDTO) {
    const playlists = await fakeApi()

    return playlists.map(this.playlistConverter.from)
  }
}
