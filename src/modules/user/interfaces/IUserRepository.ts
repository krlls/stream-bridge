import { IUser } from '../entities/IUser'

export interface IUserRepository {
  createUser: (createUser: { login: string, pass: string }) => Promise<IUser | undefined>,
  findUserById: (userId: number) => Promise<IUser | undefined>,
}
