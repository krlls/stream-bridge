import { Errors, ServiceError } from '../../../types/common'

export class ErrorDTO implements ServiceError {
  error: Errors
  constructor(error: Errors) {
    this.error = error
  }
}
