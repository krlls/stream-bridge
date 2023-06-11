import { Container } from 'inversify'

import { UserController } from '../../controllers/user'
import { TYPES } from '../../types/const'
import { IUserRepository } from '../../modules/user/interfaces/IUserRepository'
import { UserRepository } from '../../infra/db/Sqlite/repositories/UserRepository'
import { FakeService } from './test.helpers'

const fakeControllerContainer = new Container()
fakeControllerContainer.bind<UserController>(TYPES.UserController).to(UserController)
fakeControllerContainer.bind<FakeService>(TYPES.UserService).to(FakeService)
fakeControllerContainer.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

export { fakeControllerContainer }
