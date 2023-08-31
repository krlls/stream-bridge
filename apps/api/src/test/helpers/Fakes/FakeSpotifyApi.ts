import { SimplifiedPlaylist } from '@spotify/web-api-ts-sdk/src/types'

import { SpotifyClient } from '../../../infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'
import { EPrepareResult } from '../../../modules/streaming/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/ExternalTrackDTO'
import { fakeApi } from '../test.helpers'

const api = fakeApi()
export class FakeSpotifyClient extends SpotifyClient {
  prepare() {
    return Promise.resolve({ result: EPrepareResult.SUCCESS })
  }

  async getPlaylists(offset: number) {
    const playlists = (await api.getPlaylists(this.getConfig().playlistsLimit, offset)) as SimplifiedPlaylist[]

    return playlists.map(this.playlistConverter.from)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    const tracks = await api.getTracks(data.playlistId, this.getConfig().playlistsLimit, data.offset)

    return tracks.map(this.playlistedTrackConverter.from)
  }
}
