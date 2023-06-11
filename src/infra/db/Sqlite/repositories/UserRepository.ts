import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { IUserRepository } from '../../../../modules/user/interfaces/IUserRepository'
import { UserEntity } from '../entities/UserEntity'
import { TYPES } from '../../../../types/const'
import { Converter } from '../../../../types/common'
import { IUser } from '../../../../modules/user/entities/IUser'
import { getRepository } from '../SetupConnection'

@injectable()
export class UserRepository implements IUserRepository {
  @inject(TYPES.UserEntityConverter) private userEntityConverter!: Converter<UserEntity, IUser>
  repository: Repository<UserEntity>
  constructor() {
    this.repository = getRepository(UserEntity)
  }

  async createUser(createUser: { login: string, pass: string }) {
    const user = new UserEntity()

    user.login = createUser.login
    user.pass = createUser.pass

    const newUser = await this.repository.save(user)

    if (!newUser) {
      return
    }

    return this.userEntityConverter.from(newUser)
  }

  async findUserById(_userId: number) {
    return undefined
  }
}
