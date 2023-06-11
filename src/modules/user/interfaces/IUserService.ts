import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { UserDTO } from '../dtos/UserDTO'

export interface IUserService {
  createUser: (createUser: CreateUserDTO) => Promise<UserDTO | undefined>,
  findUserById: (userId: number) => Promise<UserDTO | undefined>,
}
