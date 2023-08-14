export class UpdateUserDTO {
  id: number
  login?: string
  name?: string
  pass?: string

  constructor(user: { id: number, login?: string, name?: string, pass?: string }) {
    this.id = user.id
    this.login = user.login
    this.name = user.name
    this.pass = user.pass
  }
}
