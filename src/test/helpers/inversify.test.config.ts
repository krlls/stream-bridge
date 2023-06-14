import { Container } from 'inversify'

import { UserController } from '../../controllers/user'
import { TYPES } from '../../types/const'
import { IUserRepository } from '../../modules/user/interfaces/IUserRepository'
import { UserRepository } from '../../infra/db/Sqlite/repositories/UserRepository'
import { UserService } from '../../modules/user/services/UserService'
import { IUserService } from '../../modules/user/interfaces/IUserService'
import { IAuthService } from '../../modules/auth/interfaces/IAuthService'
import { AuthService } from '../../modules/auth/services/authService'
import { UserEntityConverter } from '../../infra/db/Sqlite/converters/UserEntityConverter'
import { AuthController } from '../../controllers/auth'

const fakeControllerContainer = new Container()
fakeControllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
fakeControllerContainer.bind<AuthController>(TYPES.AuthController).to(AuthController)

fakeControllerContainer.bind<IUserService>(TYPES.UserService).to(UserService)
fakeControllerContainer.bind<IAuthService>(TYPES.AuthService).to(AuthService)

fakeControllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
fakeControllerContainer.bind<UserEntityConverter>(TYPES.UserEntityConverter).to(UserEntityConverter)

export { fakeControllerContainer }
