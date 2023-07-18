import 'reflect-metadata'

import { controllerContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { SpotifyClient } from '../../infra/clients/StreamingClient/Spotify/adapters/SpotifyClient'
import { EStreamingType } from '../../types/common'
import { IClient } from '../../infra/clients/StreamingClient/IClient'
import { EPrepareResult } from '../../modules/streaming/clients/IStreamingClient'

import process from 'process'

process.env.SPOTIFY_CLIENT_ID = 'testKey'
process.env.SPOTIFY_CLIENT_SECRET = 'testKey'

controllerContainer.unbind(TYPES.ClientApi)

class FakeSpotifyClient extends SpotifyClient {
  prepare() {
    return Promise.resolve({ result: EPrepareResult.SUCCESS })
  }
}

controllerContainer.bind<IClient>(TYPES.ClientApi).to(FakeSpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)
