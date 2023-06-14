import { Container } from 'inversify'

import { TYPES } from './types/const'
import { IUserService } from './modules/user/interfaces/IUserService'
import { UserController } from './controllers/user'
import { AuthController } from './controllers/auth'
import { UserService } from './modules/user/services/UserService'
import { IUserRepository } from './modules/user/interfaces/IUserRepository'
import { UserRepository } from './infra/db/Sqlite/repositories/UserRepository'
import { UserEntityConverter } from './infra/db/Sqlite/converters/UserEntityConverter'
import { IAuthService } from './modules/auth/interfaces/IAuthService'
import { AuthService } from './modules/auth/services/authService'
const controllerContainer = new Container()

controllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
controllerContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

controllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)
controllerContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)

controllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

controllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)

export { controllerContainer }
