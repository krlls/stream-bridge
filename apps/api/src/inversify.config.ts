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
import { IStreamingClient } from './modules/streaming/clients/IStreamingClient'
import { StreamingClient } from './infra/clients/StreamingClient/StreamingClient'
import { SpotifyClient } from './infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'
import { Factory, EStreamingType } from './types/common'
import { IClient } from './infra/clients/StreamingClient/IClient'
import { MusicImporter } from './modules/music/syncronization/MusicImporter'
import { IMusicImporter } from './modules/music/interfaces/IMusicImporter'
import { StreamingController } from './controllers/streaming'
import { ImportController } from './controllers/import'
import { MusicController } from './controllers/music'
import { AuthChecker } from './utils/crypto'
import { DeezerClient } from './infra/clients/StreamingClient/Deezer/adapters/DeezerClient'
import { IMusicExporter } from './modules/music/interfaces/IMusicExporter'
import { MusicExporter } from './modules/music/syncronization/MusicExporter'
import { ExportController } from './controllers/export'

const appContainer = new Container()

appContainer.bind<UserController>(TYPES.UserController).to(UserController)
appContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)
appContainer.bind<StreamingController>(TYPES.StreamingController).to(StreamingController)
appContainer.bind<ImportController>(TYPES.ImportController).to(ImportController)
appContainer.bind<ExportController>(TYPES.ExportController).to(ExportController)
appContainer.bind<MusicController>(TYPES.MusicController).to(MusicController)

appContainer.bind<IUserService>(TYPES.UserService).to(UserService)
appContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)
appContainer.bind<IPlaylistService>(TYPES.PlaylistService).to(PlaylistService)
appContainer.bind<ITrackService>(TYPES.TrackService).to(TrackService)
appContainer.bind<IStreamingService>(TYPES.StreamingService).to(StreamingService)

appContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
appContainer.bind<IPlaylistRepository>(TYPES.PlaylistRepository).to(PlaylistRepository)
appContainer.bind<TrackRepository>(TYPES.TrackRepository).to(TrackRepository)
appContainer.bind<StreamingRepository>(TYPES.StreamingRepository).to(StreamingRepository)

appContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)
appContainer.bind<PlaylistEntityConverter>(TYPES.PlaylistEntityConverter).to(PlaylistEntityConverter)
appContainer.bind<TrackEntityConverter>(TYPES.TrackEntityConverter).to(TrackEntityConverter)
appContainer.bind<StreamingEntityConverter>(TYPES.StreamingEntityConverter).to(StreamingEntityConverter)

appContainer.bind<AuthChecker>(TYPES.AuthChecker).to(AuthChecker)

appContainer.bind<IMusicImporter>(TYPES.MusicImporter).to(MusicImporter)
appContainer.bind<IMusicExporter>(TYPES.MusicExporter).to(MusicExporter)

appContainer.bind<IStreamingClient>(TYPES.Client).to(StreamingClient)
appContainer.bind<IClient>(TYPES.ClientApi).to(SpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)
appContainer.bind<IClient>(TYPES.ClientApi).to(DeezerClient).whenTargetNamed(EStreamingType.DEEZER)
appContainer
  .bind<Factory<IClient, [EStreamingType]>>(TYPES.ClientApiFactory)
  .toFactory<IClient, [EStreamingType]>(
    (ctx) => (type: EStreamingType) => ctx.container.getNamed<IClient>(TYPES.ClientApi, type),
  )

export const authChecker = appContainer.get<AuthChecker>(TYPES.AuthChecker)

export { appContainer }
