import { EPrepareResult } from '../clients/IStreamingClient'

export class StreamingPrepareResultDTO {
  result: EPrepareResult
  data?: {
    accessToken: string,
    expiresIn: number,
    expires: number,
  }

  constructor(
    result: EPrepareResult,
    data?: {
      accessToken: string,
      expiresIn: number,
      expires: number,
    },
  ) {
    this.result = result
    this.data = !data
      ? undefined
      : {
          accessToken: data.accessToken,
          expiresIn: data.expiresIn,
          expires: data.expires,
        }
  }
}
