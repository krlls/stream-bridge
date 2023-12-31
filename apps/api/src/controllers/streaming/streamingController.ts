import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { respond200json, respond400, respond401json, respond403 } from '../../utils/response'
import { IStreamingService } from '../../modules/streaming/interfaces/IStreamingService'
import { TYPES } from '../../types/const'
import { convertStreamingName, getUserId } from '../../utils/transform'
import { ErrorDTO } from '../../modules/common/dtos/errorDTO'
import { Errors } from '../../types/common'
import { isServiceError, isSpotifyAuthError } from '../../utils/errors'
import { checkStreamingToken, getDataFromToken } from '../../utils/crypto'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateLoginUrlDTO } from '../../modules/streaming/dtos/createLoginUrlDTO'
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

    const payload = await getDataFromToken<{ userId: number }>(params.state)

    if (!payload || !payload.userId) {
      return respond403(ctx, { error: 'User not found' })
    }

    const saveTokenData = new SaveStreamingTokenDTO({
      streamingType,
      code: params.code,
      userId: +payload.userId,
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

    const user = await this.userService.findUserById(ctx.state.user?.userId)

    if (isServiceError(user)) {
      return respond401json(ctx, user)
    }

    const authToken = await this.userService.getSignedToken(user.id)

    if (isServiceError(authToken)) {
      return respond400(ctx, authToken)
    }

    const getUrlData = new CreateLoginUrlDTO({
      streamingType,
      token: authToken.token,
    })
    const url = await this.streamingService.getLoginUrl(getUrlData)

    if (isServiceError(url)) {
      return respond400(ctx, url)
    }

    return respond200json(ctx, url)
  }

  async list(ctx: RouterContext) {
    const userId = getUserId(ctx)
    const streamings = await this.streamingService.getUserStreamings(userId)

    if (isServiceError(streamings)) {
      return respond400(ctx, streamings)
    }

    return respond200json<Api.Streaming.List.Resp>(ctx, { items: streamings })
  }

  async delete(ctx: RouterContext) {
    const userId = getUserId(ctx)
    const streamingType = convertStreamingName(ctx.params?.type || '')

    if (!streamingType) {
      return respond400(ctx, new ErrorDTO(Errors.STREAMING_NOT_FOUND))
    }

    const deleteResult = await this.streamingService.removeStreamingByType(userId, streamingType)

    if (isServiceError(deleteResult)) {
      return respond400(ctx, deleteResult)
    }

    return respond200json(ctx, deleteResult)
  }

  getAvailableStreamings(ctx: RouterContext) {
    const streamings = this.streamingService.getAvailableStreamings()

    if (isServiceError(streamings)) {
      return respond400(ctx, streamings)
    }

    return respond200json<Api.Streaming.Available.Resp>(ctx, { items: streamings })
  }
}
