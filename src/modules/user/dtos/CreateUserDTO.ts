export class CreateUserDTO {
  login: string
  name: string
  pass: string

  constructor(user: { login: string, pass: string, name: string }) {
    this.login = user.login
    this.pass = user.pass
    this.name = user.name
  }
}
