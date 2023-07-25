import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { respond200json, respond403 } from '../../utils/response'
import { TYPES } from '../../types/const'
import { isServiceError } from '../../utils/errors'
import { IAuthService } from '../../modules/auth/interfaces/IAuthService'
import { LoginDTO } from '../../modules/auth/dtos/LoginDTO'

@injectable()
export class AuthController {
  @inject(TYPES.AuthService) private authService: IAuthService
  async login(ctx: RouterContext, params: Api.Auth.Login.Req) {
    const loginData = new LoginDTO(params.login, params.pass)
    const loginResult = await this.authService.login(loginData)

    if (isServiceError(loginResult)) {
      return respond403(ctx, loginResult)
    }

    return respond200json(ctx, loginResult)
  }
}
