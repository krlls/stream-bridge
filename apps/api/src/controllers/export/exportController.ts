import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { TYPES } from '../../types/const'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { convertStreamingName, getUserId } from '../../utils/transform'
import { isServiceError } from '../../utils/errors'
import { respond200json, respond400 } from '../../utils/response'
import { ExportTracksDto } from '../../modules/music/dtos/ExportTracksDto'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { ExportPlaylistsDto } from '../../modules/music/dtos/ExportPlaylistsDto'

@injectable()
export class ExportController {
  @inject(TYPES.TrackService) private trackService: ITrackService
  @inject(TYPES.PlaylistService) private playlistService: IPlaylistService

  async exportTracks(ctx: RouterContext, params: Api.Export.Tracks.Req) {
    const userId = getUserId(ctx)
    const data = new ExportTracksDto(params)
    const exporResult = await this.trackService.exportTracks(userId, data)

    if (isServiceError(exporResult)) {
      return respond400(ctx, exporResult)
    }

    return respond200json<Api.Export.Tracks.Resp>(ctx, exporResult)
  }

  async exportPlaylists(ctx: RouterContext, params: Api.Export.Playlists.Req) {
    const userId = getUserId(ctx)
    const streamingType = convertStreamingName(params.target)

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const exportData = new ExportPlaylistsDto({ ids: params.playlistIds, target: streamingType, userId })
    const result = await this.playlistService.exportPlaylists(exportData)

    return isServiceError(result) ? respond400(ctx, result) : respond200json(ctx, result)
  }
}
