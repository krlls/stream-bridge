import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { respond200json, respond400, respond401json } from '../../utils/response'
import { TYPES } from '../../types/const'
import { convertStreamingName } from '../../utils/transform'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { isServiceError } from '../../utils/errors'
import { GetUserPlaylistsDto } from '../../modules/music/dtos/GetUserPlaylistsDto'
import { GetTracksByPlaylistDTO } from '../../modules/music/dtos/GetTracksByPlaylistDTO'

@injectable()
export class MusicController {
  @inject(TYPES.PlaylistService) private playlistService: IPlaylistService
  @inject(TYPES.TrackService) private trackService: ITrackService
  @inject(TYPES.UserService) private userService: IUserService
  async getPlaylists(ctx: RouterContext, params: Api.Music.Playlists.Req) {
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx, user)
    }

    const data = new GetUserPlaylistsDto({ ...params, userId: user.id })
    const playlists = await this.playlistService.getUserPlaylists(data)

    if (isServiceError(playlists)) {
      return respond400(ctx, playlists)
    }

    return respond200json<Api.Music.Playlists.Resp>(ctx, { items: playlists })
  }

  async getTracks(ctx: RouterContext, params: Api.Music.Tracks.Req) {
    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx, user)
    }

    const data = new GetTracksByPlaylistDTO({ ...params, userId: user.id })
    const tracks = await this.trackService.getTracksByPlaylist(data)

    if (isServiceError(tracks)) {
      return respond400(ctx, tracks)
    }

    return respond200json<Api.Music.Tracks.Resp>(ctx, { items: tracks })
  }
}
