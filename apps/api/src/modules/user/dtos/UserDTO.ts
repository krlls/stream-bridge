import { User } from '../entities/User'

export class UserDTO {
  id: number
  login: string
  name: string

  constructor(user: User) {
    this.id = user.id
    this.login = user.login
    this.name = user.name
  }
}
