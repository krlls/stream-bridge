import { inject, injectable } from 'inversify'

import { IUserService } from '../interfaces/IUserService'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { IUserRepository } from '../interfaces/IUserRepository'
import { TYPES } from '../../../types/const'
import { UserDTO } from '../dtos/UserDTO'
import { createSignedJwt, hashPass } from '../../../utils/crypto'
import { ErrorDTO } from '../../common/dtos/errorDTO'
import { Errors } from '../../../types/common'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.UserRepository) private userRepository!: IUserRepository
  async createUser(createUser: CreateUserDTO) {
    const existUser = await this.userRepository.findUserByLogin(createUser.login)

    if (existUser) {
      return new ErrorDTO(Errors.USER_EXISTS)
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
    if (!userId) {
      return new ErrorDTO(Errors.USER_NOT_FOUND)
    }

    const user = await this.userRepository.findUserById(userId)

    if (!user) {
      return new ErrorDTO(Errors.USER_NOT_FOUND)
    }

    return new UserDTO(user)
  }

  async updateUser({ pass, ...data }: UpdateUserDTO) {
    const hash = pass ? await hashPass(pass) : undefined

    const updatedUser = await this.userRepository.updateUser({ ...data, hash })

    if (!updatedUser) {
      return new ErrorDTO(Errors.USER_UPDATE_ERROR)
    }

    return new UserDTO(updatedUser)
  }

  async getSignedToken(userId: number) {
    const user = await this.findUserById(userId)

    if (!user) {
      return new ErrorDTO(Errors.USER_NOT_FOUND)
    }

    const token = await createSignedJwt({ userId })

    if (!token) {
      return new ErrorDTO(Errors.TOKEN_NOT_VALID)
    }

    return { token }
  }
}
