import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'

import { Api } from '../../types/TApi'
import { respond200, respond200json, respond400 } from '../../utils/response'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { isServiceError } from '../../utils/errors'

@injectable()
export class UserController {
  @inject(TYPES.UserService) private userService: IUserService
  async createUser(ctx: RouterContext, params: Api.User.Create.Req) {
    const createUser = new CreateUserDTO({
      login: params.login,
      pass: params.pass,
      name: params.name,
    })

    const createUserResult = await this.userService.createUser(createUser)

    if (isServiceError(createUserResult)) {
      return respond400(ctx, createUserResult)
    }

    return respond200json(ctx, createUserResult)
  }

  async profile(ctx: RouterContext) {
    respond200(ctx)
  }
}
