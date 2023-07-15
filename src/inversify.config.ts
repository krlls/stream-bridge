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
import { StreamingRepository } from './infra/db/Sqlite/repositories/StreamingRepository'
import { StreamingEntityConverter } from './infra/db/Sqlite/converters/StreamingEntityConverter.ts'
import { IStreamingService } from './modules/streaming/interfaces/IStreamingService'
import { StreamingService } from './modules/streaming/services/StreamingService'
import { IStreamingClient } from './modules/music/clients/IStreamingClient'
import { StreamingClient } from './infra/clients/StreamingClient/StreamingClient'
import { SpotifyClient } from './infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'
import { Factory, EStreamingType } from './types/common'
import { IClient } from './infra/clients/StreamingClient/IClient'
import { MusicImporter } from './modules/music/syncronization/MusicImporter'
import { IMusicImporter } from './modules/music/interfaces/IMusicImporter'

const controllerContainer = new Container()

controllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
controllerContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

controllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)
controllerContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)
controllerContainer.bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService)
controllerContainer.bind<ITrackService>(TYPES.TrackService).to(TrackService)
controllerContainer.bind<IStreamingService>(TYPES.StreamingService).to(StreamingService)

controllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
controllerContainer.bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository)
controllerContainer.bind<TrackRepository>(TYPES.TrackRepository).to(TrackRepository)
controllerContainer.bind<StreamingRepository>(TYPES.StreamingRepository).to(StreamingRepository)

controllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)
controllerContainer.bind<PlaylistEntityConverter>(TYPES.PlaylistEntityConverter).to(PlaylistEntityConverter)
controllerContainer.bind<TrackEntityConverter>(TYPES.TrackEntityConverter).to(TrackEntityConverter)
controllerContainer.bind<StreamingEntityConverter>(TYPES.StreamingEntityConverter).to(StreamingEntityConverter)

controllerContainer.bind<IMusicImporter>(TYPES.MusicImporter).to(MusicImporter)

controllerContainer.bind<IStreamingClient>(TYPES.Client).to(StreamingClient)
controllerContainer.bind<IClient>(TYPES.ClientApi).to(SpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)
controllerContainer
  .bind<Factory<IClient, [EStreamingType]>>(TYPES.ClientApiFactory)
  .toFactory<IClient, [EStreamingType]>(
    (ctx) => (type: EStreamingType) => ctx.container.getNamed<IClient>(TYPES.ClientApi, type),
  )

export { controllerContainer }
