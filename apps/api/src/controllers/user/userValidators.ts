import * as Joi from 'joi'

import { validatorFactory } from '../../utils/validate'

const createUser = validatorFactory(
  Joi.object({
    login: Joi.string().required(),
    name: Joi.string().required(),
    pass: Joi.string().required(),
  }).required(),
)

const updateUser = validatorFactory(
  Joi.object({
    login: Joi.string(),
    name: Joi.string(),
    pass: Joi.string(),
  })
    .or('login', 'name', 'pass')
    .required(),
)

const getProfile = validatorFactory(Joi.object().required().max(0))

export const userValidators = {
  createUser,
  getProfile,
  updateUser,
}
