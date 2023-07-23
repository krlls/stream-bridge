import 'reflect-metadata'

import { App } from './infra/App'
import { serverConfig } from './config'
import { SqliteDB } from './infra/db/Sqlite/SetupConnection'
import { printConsoleMessage } from './utils/app'

Promise.all([SqliteDB.instance.setupTestDB()]).then(() => {
  App.listen(serverConfig.port, () => printConsoleMessage())
})
