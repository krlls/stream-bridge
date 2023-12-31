import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'
import { Api } from 'api-types'

import { respond200json, respond400, respond404 } from '../../utils/response'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'
import { isServiceError } from '../../utils/errors'
import { getUserId } from '../../utils/transform'
import { UpdateUserDTO } from '../../modules/user/dtos/UpdateUserDTO'

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
    const userId = getUserId(ctx)
    const profile = await this.userService.findUserById(userId)

    if (isServiceError(profile)) {
      return respond404(ctx)
    }

    return respond200json(ctx, profile)
  }

  async updateUser(ctx: RouterContext, params: Api.User.Update.Req) {
    const userId = getUserId(ctx)

    const dto = new UpdateUserDTO({ id: userId, ...params })
    const result = await this.userService.updateUser(dto)

    if (isServiceError(result)) {
      return respond400(ctx, result)
    }

    return respond200json(ctx, result)
  }
}
