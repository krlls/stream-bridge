import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { CreateUser, IUserRepository } from '../../../../modules/user/interfaces/IUserRepository'
import { UserEntity } from '../entities/UserEntity'
import { TYPES } from '../../../../types/const'
import { Converter } from '../../../../types/common'
import { User } from '../../../../modules/user/entities/User'
import { getRepository } from '../SetupConnection'

@injectable()
export class UserRepository implements IUserRepository {
  @inject(TYPES.UserEntityConverter) private userEntityConverter!: Converter<UserEntity, User>
  repository: Repository<UserEntity>
  constructor() {
    this.repository = getRepository(UserEntity)
  }

  async createUser(createUser: CreateUser) {
    const user = new UserEntity()

    user.name = createUser.name
    user.login = createUser.login
    user.hash = createUser.hash

    const newUser = await this.repository.save(user)

    if (!newUser) {
      return null
    }

    return this.userEntityConverter.from(newUser)
  }

  async findUserByLogin(userLogin: string) {
    const user = await this.repository.findOneBy({
      login: userLogin,
    })

    return user
  }

  async findUserById(_userId: number) {
    return null
  }
}
