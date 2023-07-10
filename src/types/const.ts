const TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),

  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  PlaylistService: Symbol.for('PlaylistService'),

  UserRepository: Symbol.for('UserRepository'),
  PlaylistRepository: Symbol.for('PlaylistRepository'),

  UserEntityConverter: Symbol.for('UserEntityConverter'),
  PlaylistEntityConverter: Symbol.for('PlaylistEntityConverter'),
}

export { TYPES }
