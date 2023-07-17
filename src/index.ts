import 'reflect-metadata'

import { App } from './infra/App'
import { serverConfig } from './config'
import { SqliteDB } from './infra/db/Sqlite/SetupConnection'

Promise.all([SqliteDB.instance.setupTestDB()]).then(() => {
  App.listen(serverConfig.port, () =>
    // eslint-disable-next-line no-console
    console.log(`✅  The server is running at ${serverConfig.apiUrl}`),
  )
})
