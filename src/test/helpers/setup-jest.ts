import 'reflect-metadata'

import { controllerContainer } from '../../inversify.config'
import { TYPES } from '../../types/const'
import { EStreamingType } from '../../types/common'
import { FakeSpotifyClient } from './Fakes/FakeSpotifyApi'

controllerContainer.unbind(TYPES.ClientApi)
controllerContainer.bind(TYPES.ClientApi).to(FakeSpotifyClient).whenTargetNamed(EStreamingType.SPOTIFY)
