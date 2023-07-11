import { Container } from 'inversify'

import { UserController } from '../../controllers/user'
import { TYPES } from '../../types/const'
import { IUserRepository } from '../../modules/user/interfaces/IUserRepository'
import { UserRepository } from '../../infra/db/Sqlite/repositories/UserRepository'
import { UserService } from '../../modules/user/services/UserService'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { IAuthService } from '../../modules/auth/interfaces/IAuthService'
import { AuthService } from '../../modules/auth/services/authService'
import { UserEntityConverter } from '../../infra/db/Sqlite/converters/UserEntityConverter'
import { AuthController } from '../../controllers/auth'
import { PlaylistEntityConverter } from '../../infra/db/Sqlite/converters/PlaylistEntityConverter'
import { IPlaylistRepository } from '../../modules/music/interfaces/IPlaylistRepository'
import { PlaylistRepository } from '../../infra/db/Sqlite/repositories/PlaylistRepository'
import { IPlaylistService } from '../../modules/music/interfaces/IPlaylistService'
import { PlaylistService } from '../../modules/music/services/PlaylistService'
import { TrackRepository } from '../../infra/db/Sqlite/repositories/TrackRepository'
import { TrackEntityConverter } from '../../infra/db/Sqlite/converters/TrackEntityConverter.ts'
import { ITrackService } from '../../modules/music/interfaces/TrackService'
import { TrackService } from '../../modules/music/services/TrackService'

const fakeControllerContainer = new Container()
fakeControllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
fakeControllerContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

fakeControllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)
fakeControllerContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)
fakeControllerContainer.bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService)
fakeControllerContainer.bind<ITrackService>(TYPES.TrackService).to(TrackService)

fakeControllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
fakeControllerContainer.bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository)
fakeControllerContainer.bind<TrackRepository>(TYPES.TrackRepository).to(TrackRepository)

fakeControllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)
fakeControllerContainer.bind<PlaylistEntityConverter>(TYPES.PlaylistEntityConverter).to(PlaylistEntityConverter)
fakeControllerContainer.bind<TrackEntityConverter>(TYPES.TrackEntityConverter).to(TrackEntityConverter)

export { fakeControllerContainer }
