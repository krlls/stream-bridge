import { inject, injectable } from 'inversify'

import { IUserService } from '../interfaces/IUserService'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUserRepository } from '../interfaces/IUserRepository'
import { TYPES } from '../../../types/const'
import { UserDTO } from '../dtos/UserDTO'
import { hashPass } from '../../../utils/crypto'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository) private userRepository!: IUserRepository
  async createUser(createUser: CreateUserDTO) {
    const existUser = await this.userRepository.findUserByLogin(createUser.login)

    if (existUser) {
      return new ErrorDTO(Errors.USER_EXSIT)
    }

    const hash = await hashPass(createUser.pass)

    const newUser = await this.userRepository.createUser({
      login: createUser.login,
      name: createUser.name,
      hash,
    })

    if (!newUser) {
      return new ErrorDTO(Errors.USER_CREATE_ERROR)
    }

    return new UserDTO(newUser)
  }

  async findUserById(userId: number) {
    const user = await this.userRepository.findUserById(userId)

    if (!user) {
      return new ErrorDTO(Errors.USER_NOT_FOUND)
    }

    return new UserDTO(user)
  }
}
