import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const createUser = validatorFactory(
  Joi.object({
    login: Joi.string().required(),
    name: Joi.string().required(),
    pass: Joi.string().required(),
  }),
)

export const userValidators = {
  createUser,
}
