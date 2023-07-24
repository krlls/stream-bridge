export class UpadteUserDTO {
  id: number
  login?: string
  name?: string

  constructor(user: { id: number, login?: string, name?: string }) {
    this.id = user.id
    this.login = user.login
    this.name = user.name
  }
}
