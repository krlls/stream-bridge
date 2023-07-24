import { injectable } from 'inversify'
import axios, { AxiosResponse } from 'axios'
import base64url from 'base64url'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { MaxInt } from '@spotify/web-api-ts-sdk/src/types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp } from '../interfaces/ISpotifyApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'
import { TrackApiConverter } from '../converters/TrackApiConverter'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { Api } from '../../../../../types/TApi'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'
import { CredentialsConverter } from '../converters/CredentialsConverter'

import * as querystring from 'querystring'

@injectable()
export class SpotifyClient implements IClient {
  playlistConverter = new PlaylistApiConverter()
  trackConverter = new TrackApiConverter()
  tokenConverter = new TokenApiConverter()
  credentialsConverter = new CredentialsConverter()

  private _client: SpotifyApi
  private logger = new StreamingLogger(EStreamingType.SPOTIFY)
  private baseUrl = 'https://accounts.spotify.com'
  private spotifyAuthUrl = '/authorize?'
  private _scope: string[] = ['user-read-private', 'user-read-email', 'playlist-read-private']
  private redirectLink = apiLink(
    Api.Streaming.PREFIX,
    Api.Streaming.Token.PATCH,
    '/' + Api.Streaming.EApiStreamingType.SPOTIFY,
  )
  private get authHeader() {
    const { spotifyClientId, spotifyClientSecret } = serverConfig

    return 'Basic ' + base64url(`${spotifyClientId}:${spotifyClientSecret}`)
  }

  private get scope(): string {
    return this._scope.join(' ')
  }

  private get client(): SpotifyApi {
    if (!this._client) {
      throw Error('Client not defined')
    }

    return this._client
  }

  async prepare(credentials: StreamingCredentialsDTO) {
    const client = SpotifyApi.withAccessToken(serverConfig.spotifyClientId, this.credentialsConverter.from(credentials))

    try {
      const user = await client.currentUser.profile()

      if (!user || !user.id) {
        return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
      }

      this._client = client

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
    } catch (e: any) {
      this.logger.error('prepare', e?.message)

      return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
    }
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 49,
    }
  }

  async getPlaylists(offset: number) {
    const limit = this.getConfig().playlistsLimit as MaxInt<50>
    const paginatedPlaylists = await this.client.currentUser.playlists.playlists(limit, offset)

    if (!paginatedPlaylists) {
      this.logger.error('getPlaylists', 'Playlists:')

      return []
    }

    const playlists = paginatedPlaylists?.items || []

    this.logger.info('getPlaylists', 'Playlists:', playlists.length)

    return playlists.map(this.playlistConverter.from)
  }

  async getTracksByPlaylist(data: { playlistId: string, offset: number }): Promise<ExternalTrackDTO[]> {
    const limit = this.getConfig().playlistsLimit as MaxInt<50>

    try {
      const paginatedTracks = await this.client.playlists.getPlaylistItems(
        data.playlistId,
        undefined,
        undefined,
        limit,
        data.offset,
      )
      const tracks = paginatedTracks?.items || []

      if (!tracks.length) {
        return []
      }

      this.logger.info('getTracksByPlaylist', 'Tracks:', tracks.length)

      return tracks.map(this.trackConverter.from)
    } catch (e) {
      this.logger.error(e)
    }

    return []
  }

  getLoginUrl(state: string): string | null {
    const query = querystring.stringify({
      state,
      response_type: 'code',
      client_id: serverConfig.spotifyClientId,
      scope: this.scope,
      redirect_uri: this.redirectLink,
    })

    return createPatch(this.baseUrl, this.spotifyAuthUrl, query)
  }

  async getToken(code: string) {
    try {
      const tokenData: AxiosResponse<ITokenResp> = await axios.request({
        method: 'POST',
        url: '/api/token',
        baseURL: this.baseUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: this.authHeader,
        },
        data: {
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectLink,
        },
      })

      this.logger.info('getToken', tokenData.data.refresh_token.slice(-10))

      return this.tokenConverter.from(tokenData.data)
    } catch (e: any) {
      this.logger.error('getToken', e?.response?.status, e?.response?.statusText)

      return null
    }
  }
}
