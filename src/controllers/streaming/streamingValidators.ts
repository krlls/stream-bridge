import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const setToken = validatorFactory(
  Joi.object({
    code: Joi.string().required(),
    state: Joi.string().required(),
  }),
)

export const streamingValidators = {
  setToken,
}
