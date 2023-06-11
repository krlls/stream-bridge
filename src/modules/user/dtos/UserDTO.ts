import { IUser } from '../entities/IUser'

export class UserDTO {
  id: number
  login: string

  constructor(user: IUser) {
    this.id = user.id
    this.login = user.login
  }
}
