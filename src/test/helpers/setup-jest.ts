import 'reflect-metadata'

import { appContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { EStreamingType } from '../../types/common'
import { FakeSpotifyClient } from './Fakes/FakeSpotifyApi'
import { FakeTidalApi } from './Fakes/FakeTidalApi'

appContainer.unbind(TYPES.ClientApi)
appContainer.bind(TYPES.ClientApi).to(FakeSpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)

appContainer.bind(TYPES.ClientApi).to(FakeTidalApi).whenTargetNamed(EStreamingType.TIDAL) //Only for tests
