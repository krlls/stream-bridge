import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const getPlaylists = validatorFactory(
  Joi.object({
    offset: Joi.number().required(),
    limit: Joi.number().not(0).max(50),
  }).required(),
)

const getPlaylist = validatorFactory(
  Joi.object({
    id: Joi.number().required(),
  }).required(),
)

const getTracks = validatorFactory(
  Joi.object({
    playlistId: Joi.number().required(),
    offset: Joi.number().required(),
    limit: Joi.number().not(0).max(50),
  }).required(),
)

export const musicValidators = {
  getPlaylists,
  getPlaylist,
  getTracks,
}
