const TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),

  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),

  UserRepository: Symbol.for('UserRepository'),

  UserEntityConverter: Symbol.for('UserEntityConverter'),
}

export { TYPES }
