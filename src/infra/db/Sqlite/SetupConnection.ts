import { DataSource, EntityTarget, Repository } from 'typeorm'
import Database from 'better-sqlite3'

import { NODE_ENV, sqlLite } from '../../../config'

export const dataSource = new DataSource(sqlLite[NODE_ENV])

export class SqliteDB {
  private static _instance: SqliteDB
  private dbConnect!: DataSource
  private testdb!: any

  public static get instance(): SqliteDB {
    if (!this._instance) this._instance = new SqliteDB()

    return this._instance
  }

  async setupTestDB() {
    this.testdb = new Database('')
    this.dbConnect = await dataSource.initialize()
  }

  async teardownTestDB() {
    await this.dbConnect.destroy()
    this.testdb.close()
  }
}

export const getRepository = <Entity extends Record<string, any>>(target: EntityTarget<Entity>): Repository<Entity> => {
  return dataSource.getRepository(target)
}

export default dataSource
