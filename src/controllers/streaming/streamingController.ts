import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'

import { respond200json, respond400, respond403 } from '../../utils/response'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { convertStreamingName } from '../../utils/transform'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { isServiceError, isSpotifyAuthError } from '../../utils/errors'
import { checkStreamingToken } from '../../utils/crypto'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateLoginUrlDTO } from '../../modules/streaming/dtos/createLoginUrlDTO'
import { Api } from '../../types/TApi'
import { SaveStreamingTokenDTO } from '../../modules/streaming/dtos/SaveStreamingTokenDTO'

@injectable()
export class StreamingController {
  @inject(TYPES.StreamingService) private streamingService: IStreamingService
  @inject(TYPES.UserService) private userService: IUserService
  async token(ctx: RouterContext, params: Api.Streaming.Token.Req) {
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const isValidToken = await checkStreamingToken(params.state)

    if (!isValidToken) {
      const err = new ErrorDTO(Errors.TOKEN_NOT_VALID)

      return respond403(ctx, err)
    }

    if (isSpotifyAuthError(params)) {
      return respond403(ctx, { error: params.error })
    }

    const saveTokenData = new SaveStreamingTokenDTO({
      streamingType,
      code: params.code,
      userId: ctx.state.userId,
    })

    const result = await this.streamingService.saveToken(saveTokenData)

    if (isServiceError(result)) {
      return respond400(ctx, result)
    }

    return respond200json(ctx, result)
  }

  async getAuthUrl(ctx: RouterContext) {
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const authToken = await this.userService.getSignedToken(1)

    if (isServiceError(authToken)) {
      return respond400(ctx, authToken)
    }

    const getUrlData = new CreateLoginUrlDTO({ streamingType, token: authToken.token })
    const url = await this.streamingService.getLoginUrl(getUrlData)

    if (isServiceError(url)) {
      return respond400(ctx, url)
    }

    return respond200json(ctx, url)
  }
}