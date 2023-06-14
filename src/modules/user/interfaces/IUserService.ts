import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UserDTO } from '../dtos/UserDTO'
import { ServiceResultDTO } from '../../../types/common'

export interface IUserService {
  createUser: (createUser: CreateUserDTO) => Promise<ServiceResultDTO<UserDTO>>,
  findUserById: (userId: number) => Promise<ServiceResultDTO<UserDTO>>,
}
