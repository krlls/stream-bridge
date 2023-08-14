import { EPrepareResult } from '../clients/IStreamingClient'
import { CreateStreamingTokenDTO } from './CreateStreamingTokenDTO'

export class StreamingPrepareResultDTO {
  result: EPrepareResult
  data?: CreateStreamingTokenDTO

  constructor(result: EPrepareResult, data?: CreateStreamingTokenDTO) {
    this.result = result
    this.data = !data ? undefined : data
  }
}
