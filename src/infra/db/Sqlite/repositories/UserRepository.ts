import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'

import { CreateUser, IUserRepository, UpdateUser } from '../../../../modules/user/interfaces/IUserRepository'
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

    if (!user) {
      return null
    }

    return this.userEntityConverter.from(user)
  }

  async findUserById(userId: number) {
    const user = await this.repository.findOneBy({
      id: userId,
    })

    if (!user) {
      return null
    }

    return this.userEntityConverter.from(user)
  }

  async updateUser({ id, login, name }: UpdateUser) {
    const updatedUser = await this.repository.update({ id }, { login, name })

    if (!updatedUser.affected) {
      return null
    }

    const newUser = await this.findUserById(id)

    if (!newUser) {
      return null
    }

    return newUser
  }
}
