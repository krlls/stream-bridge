const TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),

  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  PlaylistService: Symbol.for('PlaylistService'),
  TrackService: Symbol.for('TrackService'),

  UserRepository: Symbol.for('UserRepository'),
  PlaylistRepository: Symbol.for('PlaylistRepository'),
  TrackRepository: Symbol.for('TrackRepository'),

  UserEntityConverter: Symbol.for('UserEntityConverter'),
  PlaylistEntityConverter: Symbol.for('PlaylistEntityConverter'),
  TrackEntityConverter: Symbol.for('TrackEntityConverter'),
}

export { TYPES }
