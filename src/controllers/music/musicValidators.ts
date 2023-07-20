import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const getPlaylists = validatorFactory(
  Joi.object({
    offset: Joi.number().max(50).required(),
    limit: Joi.number().max(50),
  }).required(),
)

const getTracks = validatorFactory(
  Joi.object({
    playlistId: Joi.number().required(),
    offset: Joi.number().max(50).required(),
    limit: Joi.number().max(50),
  }).required(),
)

export const musicValidators = {
  getPlaylists,
  getTracks,
}
