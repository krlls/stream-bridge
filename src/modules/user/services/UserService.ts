import { inject, injectable } from 'inversify'

import { IUserService } from '../interfaces/IUserService'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUserRepository } from '../interfaces/IUserRepository'
import { TYPES } from '../../../types/const'
import { UserDTO } from '../dtos/UserDTO'
import { hashPass } from '../../../utils/crypto'

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository) private userRepository!: IUserRepository
  async createUser(createUser: CreateUserDTO) {
    const existUser = await this.userRepository.findUserByLogin(createUser.login)

    if (existUser) {
      return
    }

    const hash = await hashPass(createUser.pass)

    const newUser = await this.userRepository.createUser({
      login: createUser.login,
      name: createUser.name,
      hash,
    })

    if (!newUser) {
      return
    }

    return new UserDTO(newUser)
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findUserById(userId)

    if (!user) {
      return
    }

    return new UserDTO(user)
  }
}
