import * as Joi from 'joi'
import { Api } from 'api-types'

import { validatorFactory } from '../../utils/validate'

import EApiStreamingType = Api.Streaming.EApiStreamingType

const exportTracks = validatorFactory(
  Joi.object<Api.Export.Tracks.Req>({
    trackIds: Joi.array().items(Joi.number()).min(1).required(),
    to: Joi.string()
      .valid(...Object.values(EApiStreamingType))
      .required(),
  }).required(),
)

export const exportValidators = {
  exportTracks,
}
