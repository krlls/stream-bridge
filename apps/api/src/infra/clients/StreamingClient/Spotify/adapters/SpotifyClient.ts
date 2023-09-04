import { injectable } from 'inversify'
import axios, { AxiosResponse } from 'axios'
import base64url from 'base64url'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import { MaxInt } from '@spotify/web-api-ts-sdk/src/types'
import { Api } from 'api-types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp } from '../interfaces/ISpotifyApi'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'
import { PlaylistedTrackApiConverter } from '../converters/PlaylistedTrackApiConverter'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'
import { CredentialsConverter } from '../converters/CredentialsConverter'
import { ApiCreatePlaylistDTO } from '../../../../../modules/music/dtos/ApiCreatePlaylistDTO'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'
import { ApiFindTrackDto } from '../../../../../modules/music/dtos/ApiFindTrackDto'
import { TrackApiConverter } from '../converters/TrackApiConverter'

import * as querystring from 'querystring'

@injectable()
export class SpotifyClient implements IClient {
  playlistConverter = new PlaylistApiConverter()
  playlistedTrackConverter = new PlaylistedTrackApiConverter()
  trackConverter = new TrackApiConverter()
  tokenConverter = new TokenApiConverter()
  credentialsConverter = new CredentialsConverter()

  private _client: SpotifyApi
  private logger = new StreamingLogger(EStreamingType.SPOTIFY)
  private baseUrl = 'https://accounts.spotify.com'
  private spotifyAuthUrl = '/authorize?'
  private _scope: string[] = [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-private',
    'playlist-modify-public',
  ]
  private redirectLink = apiLink(
    Api.Streaming.PREFIX,
    Api.Streaming.Token.PATCH,
    '/' + Api.Streaming.EApiStreamingType.SPOTIFY,
  )

  private userId: string

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

  async prepare(credentialsDto: StreamingCredentialsDTO) {
    try {
      const { credentials, token } = await this.invalidateCredentials(credentialsDto)
      this._client = await this.setupClient(credentials)

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS, token)
    } catch (e: any) {
      this.logger.error('prepare', e?.message)

      const { credentials, token } = await this.refreshCredentials(credentialsDto)

      try {
        this._client = await this.setupClient(credentials)
      } catch (_) {
        return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
      }

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS, token)
    }
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(offset: number) {
    const limit = this.getConfig().playlistsLimit as MaxInt<50>
    const paginatedPlaylists = await this.client.currentUser.playlists.playlists(limit, offset)

    if (!paginatedPlaylists) {
      this.logger.error('getPlaylists', 'empty result')

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

      return tracks.map(this.playlistedTrackConverter.from)
    } catch (e) {
      this.logger.error(e)
    }

    return []
  }

  async createPlaylist({ name, description }: ApiCreatePlaylistDTO): Promise<ExternalPlaylistDTO | null> {
    try {
      const resp = await this.client.playlists.createPlaylist(this.userId, {
        name,
        description,
        public: false,
        collaborative: false,
      })

      if (!resp) {
        return null
      }

      this.logger.info('createPlaylist', resp.id)

      return this.playlistConverter.from(resp)
    } catch (e: any) {
      this.logger.error('createPlaylist', e)

      return null
    }
  }

  async findTrack({ artist, name }: ApiFindTrackDto): Promise<ExternalTrackDTO[]> {
    try {
      const resp = await this.client.search(`${artist} ${name}`, ['track'])

      this.logger.info('findTrack', artist, '–', name, '| RESULT:', resp?.tracks?.items?.length)

      return (resp.tracks.items || []).map(this.trackConverter.from)
    } catch (e) {
      this.logger.error('findTrack', e)

      return []
    }
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

  async addTrackToPlaylist(trackIds: string[], playlistId: string): Promise<boolean> {
    try {
      const resp = await this.client.playlists.addItemsToPlaylist(playlistId, trackIds)

      this.logger.info('addTrackToPlaylist', playlistId, resp)

      return true
    } catch (e: any) {
      this.logger.info('addTrackToPlaylist', e)

      return false
    }
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

  private async updateToken(refreshToken: string) {
    try {
      const tokenData: AxiosResponse<Omit<ITokenResp, 'refresh_token'>> = await axios.request({
        method: 'POST',
        url: '/api/token',
        baseURL: this.baseUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: this.authHeader,
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
      })

      this.logger.info('Spotify api update token', tokenData.data.access_token.slice(-10))

      return this.tokenConverter.from({ refresh_token: refreshToken, ...tokenData.data })
    } catch (e: any) {
      this.logger.error('Spotify api update token error', e?.response?.status, e?.response?.statusText)

      return null
    }
  }

  private needsUpdate(expires: number) {
    return expires < Date.now()
  }

  private async invalidateCredentials(credentials: StreamingCredentialsDTO) {
    if (!this.needsUpdate(credentials.expires)) {
      return { credentials, token: undefined }
    }

    return this.refreshCredentials(credentials)
  }

  private async refreshCredentials(credentials: StreamingCredentialsDTO) {
    const newToken = await this.updateToken(credentials.refreshToken)

    if (!newToken) {
      return { credentials }
    }

    this.logger.warn('Refresh token', newToken.token.slice(-10))

    return { credentials: new StreamingCredentialsDTO({ id: credentials.streamingId, ...newToken }), token: newToken }
  }

  private async setupClient(credentials: StreamingCredentialsDTO) {
    const client = SpotifyApi.withAccessToken(serverConfig.spotifyClientId, this.credentialsConverter.from(credentials))
    const profile = await client.currentUser.profile()

    if (profile) {
      this.userId = profile.id

      return client
    }

    throw Error('No client!')
  }
}
