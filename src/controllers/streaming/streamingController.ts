import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'

import { respond200json, respond400 } from '../../utils/response'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { convertStreamingName } from '../../utils/transform'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { isServiceError } from '../../utils/errors'

@injectable()
export class StreamingController {
  @inject(TYPES.StreamingService) private streamingService: IStreamingService
  async token(ctx: RouterContext, params: any) {
    return respond200json(ctx, params)
  }

  async getAuthUrl(ctx: RouterContext) {
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const url = await this.streamingService.getLoginUrl(streamingType)

    if (isServiceError(url)) {
      return respond400(ctx, url)
    }

    return respond200json(ctx, url)
  }
}
