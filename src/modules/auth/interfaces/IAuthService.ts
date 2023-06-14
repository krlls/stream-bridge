import { LoginDTO } from '../dtos/LoginDTO'
import { ServiceResultDTO } from '../../../types/common'
import { LoginSuccessDTO } from '../dtos/loginSuccessDTO'

export interface IAuthService {
  login: (login: LoginDTO) => Promise<ServiceResultDTO<LoginSuccessDTO>>,
}
