export class CreateUserDTO {
  login: string
  pass: string

  constructor(login: string, pass: string) {
    this.login = login
    this.pass = pass
  }
}
