import { Container } from 'inversify'

import { TYPES } from './types/const'
import { IUserService } from './modules/user/interfaces/IUserService'
import { UserController } from './controllers/user'
import { UserService } from './modules/user/services/UserService'
import { IUserRepository } from './modules/user/interfaces/IUserRepository'
import { UserRepository } from './infra/db/Sqlite/repositories/UserRepository'
import { UserEntityConverter } from './infra/db/Sqlite/converters/UserEntityConverter'

const controllerContainer = new Container()

controllerContainer.bind<UserController>(TYPES.UserController).to(UserController)

controllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)

controllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
controllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)

export { controllerContainer }
