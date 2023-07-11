import { Container } from 'inversify'

import { TYPES } from './types/const'
import { IUserService } from './modules/user/interfaces/IUserService'
import { UserController } from './controllers/user'
import { AuthController } from './controllers/auth'
import { UserService } from './modules/user/services/UserService'
import { IUserRepository } from './modules/user/interfaces/IUserRepository'
import { UserRepository } from './infra/db/Sqlite/repositories/UserRepository'
import { UserEntityConverter } from './infra/db/Sqlite/converters/UserEntityConverter'
import { IAuthService } from './modules/auth/interfaces/IAuthService'
import { AuthService } from './modules/auth/services/authService'
import { PlaylistEntityConverter } from './infra/db/Sqlite/converters/PlaylistEntityConverter'
import { IPlaylistRepository } from './modules/music/interfaces/IPlaylistRepository'
import { PlaylistRepository } from './infra/db/Sqlite/repositories/PlaylistRepository'
import { IPlaylistService } from './modules/music/interfaces/IPlaylistService'
import { PlaylistService } from './modules/music/services/PlaylistService'
import { TrackEntityConverter } from './infra/db/Sqlite/converters/TrackEntityConverter.ts'
import { TrackRepository } from './infra/db/Sqlite/repositories/TrackRepository'
import { ITrackService } from './modules/music/interfaces/TrackService'
import { TrackService } from './modules/music/services/TrackService'
const controllerContainer = new Container()

controllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
controllerContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

controllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)
controllerContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)
controllerContainer.bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService)
controllerContainer.bind<ITrackService>(TYPES.TrackService).to(TrackService)

controllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
controllerContainer.bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository)
controllerContainer.bind<TrackRepository>(TYPES.TrackRepository).to(TrackRepository)

controllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)
controllerContainer.bind<PlaylistEntityConverter>(TYPES.PlaylistEntityConverter).to(PlaylistEntityConverter)
controllerContainer.bind<TrackEntityConverter>(TYPES.TrackEntityConverter).to(TrackEntityConverter)

export { controllerContainer }
