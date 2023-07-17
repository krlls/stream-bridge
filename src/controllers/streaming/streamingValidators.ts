import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const setToken = validatorFactory(
  Joi.object({
    state: Joi.string().required(),
    code: Joi.string(),
    error: Joi.string(),
  }).xor('code', 'error'),
)

export const streamingValidators = {
  setToken,
}
