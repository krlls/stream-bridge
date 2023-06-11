import { RouterContext } from 'koa-router'
import { inject, injectable } from 'inversify'

import { Api } from '../../types/TApi'
import { respond200json, respond400 } from '../../utils/response'
import { TYPES } from '../../types/const'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { CreateUserDTO } from '../../modules/user/dtos/CreateUserDTO'

@injectable()
export class UserController {
  @inject(TYPES.UserService) private userService!: IUserService
  async createUser(ctx: RouterContext, params: Api.User.Create.Req) {
    const createUser = new CreateUserDTO(params.login, params.pass)
    const newUser = await this.userService.createUser(createUser)

    if (newUser) {
      return respond200json(ctx, newUser)
    }

    return respond400(ctx)
  }
}
