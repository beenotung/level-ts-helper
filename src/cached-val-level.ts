import { CachedLevel } from './cached-level'

export class CachedValLevel {
  constructor(private level: CachedLevel<string>) {}

  async init() {
    await this.level.populateCache()
  }

  async storeValue(value: string): Promise<string> {
    if (this.level.exists(value)) {
      return this.level.get(value)
    }
    const id = (this.level.size + 1).toString(36)
    await this.level.put(value, id)
    return id
  }

  getValue(id: string): string {
    return this.level.getKey(id)
  }
}
