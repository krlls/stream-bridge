import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const importPlaylists = validatorFactory(
  Joi.object({
    streamingType: Joi.string().required(),
  }).required(),
)

const importMedia = validatorFactory(
  Joi.object({
    streamingType: Joi.string().required(),
  }).required(),
)

const importTracksByPlaylist = validatorFactory(
  Joi.object({
    playlistId: Joi.number().required(),
  }).required(),
)

export const importValidators = {
  importPlaylists,
  importTracksByPlaylist,
  importMedia,
}
