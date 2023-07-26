import { store } from '../store/configureStore.ts'
import { streamingApi } from '../data/streaming'

export const streamingLoader = async () => {
  store.dispatch(streamingApi.endpoints.getAvailableStreamings.initiate(''))

  return null
}
