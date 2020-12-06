import Level from '@beenotung/level-ts'
import { mkdirSync } from 'fs'
import { join } from 'path'
import { CachedLevel } from './cached-level'
import { CachedValLevel } from './cached-val-level'

export class LevelDatabase {
  constructor(public dir: string) {
    mkdirSync(dir, { recursive: true })
  }

  getTable<T>(table: string) {
    const dir = join(this.dir, table)
    return new Level<T>(dir)
  }

  getCachedTable<T>(table: string) {
    return new CachedLevel<T>(this.getTable<T>(table))
  }

  getCachedValTable(table: string) {
    return new CachedValLevel(this.getCachedTable(table))
  }
}
