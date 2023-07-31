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
import { isServiceError } from '../../utils/errors'
import { ImportMediaDTO } from '../../modules/music/dtos/ImportMediaDTO'
import { ImportTracksByPlaylistDTO } from '../../modules/music/dtos/ImportTracksByPlaylistDTO'
import { ITrackService } from '../../modules/music/interfaces/TrackService'

@injectable()
export class ImportController {
  @inject(TYPES.PlaylistService) private playlistService: IPlaylistService
  @inject(TYPES.TrackService) private trackService: ITrackService
  @inject(TYPES.UserService) private userService: IUserService
  async importPlaylists(ctx: RouterContext, params: Api.Import.Playlists.Req) {
    const streamingType = convertStreamingName(params.streamingType || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx, user)
    }

    const importData = new ImportMediaDTO({ streamingType, userId: user.id })
    const importPlaylistsResult = await this.playlistService.importPlaylists(importData)

    return isServiceError(importPlaylistsResult)
      ? respond400(ctx, importPlaylistsResult)
      : respond200json(ctx, importPlaylistsResult)
  }

  async importTracksByPlaylist(ctx: RouterContext, params: Api.Import.Tracks.Req) {
    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx, user)
    }

    const importData = new ImportTracksByPlaylistDTO({
      playlistId: params.playlistId,
      userId: user.id,
    })
    const importTracksResult = await this.trackService.importTracksByPlaylist(importData)

    return isServiceError(importTracksResult)
      ? respond400(ctx, importTracksResult)
      : respond200json(ctx, importTracksResult)
  }
}
