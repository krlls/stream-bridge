import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UserDTO } from '../dtos/UserDTO'
import { ServiceResultDTO } from '../../../types/common'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'

export interface IUserService {
  createUser: (createUser: CreateUserDTO) => Promise<ServiceResultDTO<UserDTO>>,
  findUserById: (userId: number) => Promise<ServiceResultDTO<UserDTO>>,
  updateUser: (update: UpdateUserDTO) => Promise<ServiceResultDTO<UserDTO>>,
  getSignedToken: (userId: number) => Promise<ServiceResultDTO<{ token: string }>>,
}
