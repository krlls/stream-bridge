import * as Joi from 'joi'
import { Api } from 'api-types'

import { validatorFactory } from '../../utils/validate'

const exportTracks = validatorFactory(
  Joi.object<Api.Export.Tracks.Req>({
    trackIds: Joi.array().items(Joi.number()).min(1).required(),
    playlistId: Joi.number().required(),
  }).required(),
)

export const exportValidators = {
  exportTracks,
}
