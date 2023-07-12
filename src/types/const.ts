const TYPES = {
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),

  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  PlaylistService: Symbol.for('PlaylistService'),
  TrackService: Symbol.for('TrackService'),
  StreamingService: Symbol.for('StreamingService'),

  UserRepository: Symbol.for('UserRepository'),
  PlaylistRepository: Symbol.for('PlaylistRepository'),
  TrackRepository: Symbol.for('TrackRepository'),
  StreamingRepository: Symbol.for('StreamingRepository'),

  UserEntityConverter: Symbol.for('UserEntityConverter'),
  PlaylistEntityConverter: Symbol.for('PlaylistEntityConverter'),
  TrackEntityConverter: Symbol.for('TrackEntityConverter'),
  StreamingEntityConverter: Symbol.for('StreamingEntityConverter'),
}

export { TYPES }
