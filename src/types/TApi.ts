export namespace Api {
  export namespace User {
    export const PREFIX = '/user'

    export namespace Create {
      export const URL = '/create'

      export type Req = {
        login: string,
        pass: string,
      }
    }
  }
}
