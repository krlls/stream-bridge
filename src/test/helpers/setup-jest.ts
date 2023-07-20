import 'reflect-metadata'

import { appContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { EStreamingType } from '../../types/common'
import { FakeSpotifyClient } from './Fakes/FakeSpotifyApi'

appContainer.unbind(TYPES.ClientApi)
appContainer.bind(TYPES.ClientApi).to(FakeSpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)
