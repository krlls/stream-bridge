import Koa from 'koa'
import { koaBody } from 'koa-body'

import { routers } from '../../routes'
import { SpotifyClient } from '../clients/StreamingClient/Spotify/adapters/SpotifyClient'

const app = new Koa()

app.use(koaBody())

routers(app)

new SpotifyClient().getPlaylists({} as any)

export const App = app
