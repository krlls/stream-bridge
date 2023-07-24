import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const authUser = validatorFactory(
  Joi.object({
    login: Joi.string().required(),
    pass: Joi.string().required(),
  }).required(),
)

export const authValidators = {
  authUser,
}
