import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'

import { E_NODE_ENV } from '../types/common'

import { join } from 'path'

const entitiesPatch = join(__dirname, '../infra/db/Sqlite/entities/**/*.{ts,js}')
const dbPatch = 'data/db.sqlite3'
export const sqlLite: Record<E_NODE_ENV, DataSourceOptions> = {
  [E_NODE_ENV.TEST]: {
    type: 'better-sqlite3',
    database: ':memory:',
    entities: [entitiesPatch],
    synchronize: true,
  },
  [E_NODE_ENV.DEV]: {
    type: 'better-sqlite3',
    database: dbPatch,
    entities: [entitiesPatch],
    synchronize: true,
    migrationsRun: false,
    logging: false,
    enableWAL: true,
  },
  [E_NODE_ENV.PROD]: {
    type: 'better-sqlite3',
    database: dbPatch,
    entities: [entitiesPatch],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    enableWAL: true,
  },
}
