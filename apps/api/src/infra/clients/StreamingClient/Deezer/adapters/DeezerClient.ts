import { injectable } from 'inversify'
import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Api } from 'api-types'

import { StreamingCredentialsDTO } from '../../../../../modules/music/dtos/StreamingCredentialsDTO'
import { IClient } from '../../IClient'
import { EPrepareResult, StreamingClientConfig } from '../../../../../modules/streaming/clients/IStreamingClient'
import { ITokenResp, Paginated, Playlist, Track } from '../interfaces/DeezerApi'
import { serverConfig } from '../../../../../config'
import { apiLink, createPatch } from '../../../../../utils/links'
import { StreamingLogger } from '../../../../../utils/logger'
import { TokenApiConverter } from '../converters/TokenApiConverter'
import { PlaylistApiConverter } from '../converters/PlaylistApiConverter'
import { EStreamingType } from '../../../../../types/common'
import { StreamingPrepareResultDTO } from '../../../../../modules/streaming/dtos/StreamingPrepareResultDTO'
import { TrackApiConverter } from '../converters/TrackApiConverter'
import { ApiCreatePlaylistDTO } from '../../../../../modules/music/dtos/ApiCreatePlaylistDTO'
import { ExternalPlaylistDTO } from '../../../../../modules/music/dtos/ExternalPlaylistDTO'
import { ApiFindTrackDto } from '../../../../../modules/music/dtos/ApiFindTrackDto'
import { ExternalTrackDTO } from '../../../../../modules/music/dtos/ExternalTrackDTO'

import * as querystring from 'querystring'

@injectable()
export class DeezerClient implements IClient {
  tokenConverter = new TokenApiConverter()
  playlistApiConverter = new PlaylistApiConverter()
  trackApiConverter = new TrackApiConverter()

  private connectUrl = 'https://connect.deezer.com'
  private baseUrl = 'https://api.deezer.com'
  private authUrl = '/oauth/auth.php?'
  private scope = ['offline_access', 'manage_library', 'basic_access', 'email'].join(',')
  private logger = new StreamingLogger(EStreamingType.DEEZER)

  private userId: number

  private _client: AxiosInstance

  private get client() {
    if (!this._client) {
      throw Error('Client not init')
    }

    return this._client
  }

  async prepare(credentialsDto: StreamingCredentialsDTO) {
    try {
      this._client = await this.setUpClient(credentialsDto.token)

      return new StreamingPrepareResultDTO(EPrepareResult.SUCCESS)
    } catch (e: any) {
      this.logger.error('prepare', e?.message)

      return new StreamingPrepareResultDTO(EPrepareResult.ERROR)
    }
  }

  getConfig(): StreamingClientConfig {
    return {
      playlistsLimit: 50,
    }
  }

  async getPlaylists(offset: number) {
    const limit = this.getConfig().playlistsLimit

    try {
      const { data } = await this.client.get<Paginated<Playlist>>('/user/me/playlists', {
        params: {
          index: offset,
          limit,
        },
      })

      if (!data?.data?.length) {
        return []
      }

      this.logger.info('getPlaylists', 'Playlists:', data?.data?.length)

      return (data?.data || []).map(this.playlistApiConverter.from)
    } catch {
      this.logger.error('getPlaylists')

      return []
    }
  }

  async getTracksByPlaylist({ offset, playlistId }: { playlistId: string, offset: number }) {
    const limit = this.getConfig().playlistsLimit

    try {
      const { data } = await this.client.get<Paginated<Track>>(`/playlist/${playlistId}/tracks`, {
        params: {
          index: offset,
          limit,
        },
      })

      if (!data?.data?.length) {
        return []
      }

      this.logger.info('getPlaylists', 'Tracks:', data?.data?.length)

      return (data?.data || []).map(this.trackApiConverter.from)
    } catch {
      this.logger.error('getPlaylists')

      return []
    }
  }

  getLoginUrl(state: string): string {
    const query = querystring.stringify({
      app_id: serverConfig.deezerClientId,
      perms: this.scope,
      redirect_uri: this.redirectLink(state),
    })

    return createPatch(this.connectUrl, this.authUrl, query)
  }

  async getToken(code: string) {
    try {
      const tokenData: AxiosResponse<ITokenResp> = await axios.request({
        method: 'GET',
        url: '/oauth/access_token.php',
        baseURL: this.connectUrl,
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        params: {
          code,
          app_id: serverConfig.deezerClientId,
          secret: serverConfig.deezerClientSecret,
          output: 'json',
        },
      })

      this.logger.info('getToken', tokenData.data.access_token.slice(-10))

      return this.tokenConverter.from(tokenData.data)
    } catch (e: any) {
      this.logger.error('getToken', e?.response?.status, e?.response?.statusText)

      return null
    }
  }

  async createPlaylist({ name }: ApiCreatePlaylistDTO): Promise<ExternalPlaylistDTO | null> {
    try {
      const { data } = await this.client.get(`/user/${this.userId}/playlists`, {
        params: {
          request_method: 'post',
          title: name,
          public: false,
        },
      })

      if (!data || !data?.id) {
        return null
      }

      this.logger.info('createPlaylist', data?.id)

      return this.getPlaylistById(data.id)
    } catch (e: any) {
      this.logger.error('createPlaylist', e)

      return null
    }
  }

  async getPlaylistById(id: number): Promise<ExternalPlaylistDTO | null> {
    try {
      const { data } = await this.client.get<Playlist>(`/playlist/${id}`)

      if (!data) {
        return null
      }

      this.logger.info('getPlaylistById', id)

      return this.playlistApiConverter.from(data)
    } catch (e) {
      this.logger.error('getPlaylistById', id, e)

      return null
    }
  }

  async findTrack(query: ApiFindTrackDto): Promise<ExternalTrackDTO[]> {
    let result: ExternalTrackDTO[] = []

    if (query.isrc) {
      result = await this.findTrackByIsrc(query.isrc)
    }

    if (result.length) {
      return result
    }

    result = await this.findTrackWithOptions(query)

    if (result.length) {
      return result
    }

    result = await this.findTrackWithOptions(query, false)

    if (result.length) {
      return result
    }

    return []
  }

  private async findTrackByIsrc(isrc: string) {
    try {
      const { data } = await this.client.get<Paginated<Track>>(`/search/track/isrc:${isrc}`)

      if (!data.data) {
        return []
      }

      this.logger.info('findTrack', 'ISRC:', isrc, '| result:', data.data.length)

      return data.data.filter((e) => e.type === 'track').map(this.trackApiConverter.from)
    } catch (e) {
      this.logger.error('findTrack', e)

      return []
    }
  }

  private async findTrackWithOptions({ name, artist, album }: ApiFindTrackDto, strict: boolean = true) {
    const query = strict ? `artist:"${artist}" track:"${name}" album:"${album}"` : `${artist} ${name}`

    try {
      const { data } = await this.client.get<Paginated<Track>>('/search/track', {
        params: {
          q: query,
        },
      })

      if (!data.data) {
        return []
      }

      this.logger.info('findTrack', artist, '–', name, '| result:', data.data.length)

      return data.data.filter((e) => e.type === 'track').map(this.trackApiConverter.from)
    } catch (e) {
      this.logger.error('findTrack', e)

      return []
    }
  }
  private async setUpClient(token: string) {
    const client = axios.create({
      baseURL: this.baseUrl,
      params: { access_token: token },
    })
    const res = await client.get('/user/me')

    if (!res.data?.error && res.status === 200) {
      this.userId = res.data.id

      return client
    }

    throw Error('Token not valid')
  }

  private redirectLink = (state: string) =>
    apiLink(
      Api.Streaming.PREFIX,
      Api.Streaming.Token.PATCH,
      '/' + Api.Streaming.EApiStreamingType.DEEZER,
      '?state=',
      state,
    )
}
