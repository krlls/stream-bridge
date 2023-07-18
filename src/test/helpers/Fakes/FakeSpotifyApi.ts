import { Playlist } from '@spotify/web-api-ts-sdk/src/types'

import { SpotifyClient } from '../../../infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'
import { EPrepareResult } from '../../../modules/streaming/clients/IStreamingClient'
import { ExternalTrackDTO } from '../../../modules/music/dtos/TrackPlaylistDTO'
import { fakeApi } from '../test.helpers'

export class FakeSpotifyClient extends SpotifyClient {
  prepare() {
    return Promise.resolve({ result: EPrepareResult.SUCCESS })
  }

  async getPlaylists(offset: number) {
    const playlists = (await fakeApi.getPlaylists(this.getConfig().playlistsLimit, offset)) as Playlist[]

    return playlists.map(this.playlistConverter.from)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    const tracks = await fakeApi.getTracks(data.playlistId, this.getConfig().playlistsLimit, data.offset)

    return tracks.map(this.trackConverter.from)
  }
}
