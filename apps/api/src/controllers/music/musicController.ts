import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { respond200json, respond400, respond404 } from '../../utils/response'
import { TYPES } from '../../types/const'
import { convertStreamingName, getUserId } from '../../utils/transform'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { isServiceError } from '../../utils/errors'
import { GetUserPlaylistsDto } from '../../modules/music/dtos/GetUserPlaylistsDto'
import { GetTracksByPlaylistDTO } from '../../modules/music/dtos/GetTracksByPlaylistDTO'

@injectable()
export class MusicController {
  @inject(TYPES.PlaylistService) private playlistService: IPlaylistService
  @inject(TYPES.TrackService) private trackService: ITrackService
  async getPlaylists(ctx: RouterContext, params: Api.Music.Playlists.Req) {
    const userId = getUserId(ctx)
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const data = new GetUserPlaylistsDto({ ...params, userId })
    const playlists = await this.playlistService.getUserPlaylists(data)

    if (isServiceError(playlists)) {
      return respond400(ctx, playlists)
    }

    return respond200json<Api.Music.Playlists.Resp>(ctx, { items: playlists })
  }

  async getPlaylist(ctx: RouterContext, { id }: Api.Music.Playlist.Req) {
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const playlist = await this.playlistService.getPlaylistById(id)

    if (isServiceError(playlist)) {
      return respond404(ctx, playlist)
    }

    return respond200json<Api.Music.Playlist.Resp>(ctx, playlist)
  }

  async getTracks(ctx: RouterContext, params: Api.Music.Tracks.Req) {
    const userId = getUserId(ctx)

    const data = new GetTracksByPlaylistDTO({ ...params, userId })
    const tracks = await this.trackService.getTracksByPlaylist(data)

    if (isServiceError(tracks)) {
      return respond400(ctx, tracks)
    }

    return respond200json<Api.Music.Tracks.Resp>(ctx, { items: tracks })
  }
}
