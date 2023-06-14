import { User } from '../entities/User'

export interface IUserRepository {
  createUser: (createUser: CreateUser) => Promise<User | undefined>,
  findUserById: (userId: number) => Promise<User | undefined>,
}

export type CreateUser = {
  login: string,
  name: string,
  hash: string,
}
