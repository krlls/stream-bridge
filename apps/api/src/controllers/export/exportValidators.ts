import * as Joi from 'joi'
import { Api } from 'api-types'

import { validatorFactory } from '../../utils/validate'

export const exportValidators = {
  exportTracks: validatorFactory(
    Joi.object<Api.Export.Tracks.Req>({
      trackIds: Joi.array().items(Joi.number()).min(1).required(),
      playlistId: Joi.number().required(),
    }).required(),
  ),

  exportPlaylists: validatorFactory(
    Joi.object<Api.Export.Playlists.Req>({
      playlistIds: Joi.array().items(Joi.number()).min(1).required(),
      target: Joi.string()
        .valid(...Object.values(Api.Streaming.EApiStreamingType))
        .required(),
    }).required(),
  ),
}
