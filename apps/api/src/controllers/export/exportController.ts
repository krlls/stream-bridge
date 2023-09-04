import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { TYPES } from '../../types/const'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { getUserId } from '../../utils/transform'
import { isServiceError } from '../../utils/errors'
import { respond200json, respond400 } from '../../utils/response'
import { ExportTracksDto } from '../../modules/music/dtos/ExportTracksDto'

@injectable()
export class ExportController {
  @inject(TYPES.TrackService) private trackService: ITrackService

  async exportTracks(ctx: RouterContext, params: Api.Export.Tracks.Req) {
    const userId = getUserId(ctx)
    const data = new ExportTracksDto(params)
    const exporResult = await this.trackService.exportTracks(userId, data)

    if (isServiceError(exporResult)) {
      return respond400(ctx, exporResult)
    }

    return respond200json<Api.Export.Tracks.Resp>(ctx, exporResult)
  }
}
