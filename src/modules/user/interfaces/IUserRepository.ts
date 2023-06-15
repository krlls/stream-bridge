import { User } from '../entities/User'

export interface IUserRepository {
  createUser: (createUser: CreateUser) => Promise<User | null>,
  findUserById: (userId: number) => Promise<User | null>,
  findUserByLogin: (userlogin: string) => Promise<User | null>,
  updateUser: (update: UpdateUser) => Promise<User | null>,
}

export type CreateUser = {
  login: string,
  name: string,
  hash: string,
}

export type UpdateUser = {
  id: number,
  name?: string,
  login?: string,
}
