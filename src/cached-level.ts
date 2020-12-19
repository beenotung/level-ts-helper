import Level from '@beenotung/level-ts'

export class CachedLevel<T> {
  private keys = new Set<string>()
  private values: Record<string, T> = {}

  constructor(private level: Level) {}

  get size() {
    return this.keys.size
  }

  async populateCache() {
    await this.level.eachSync({
      eachFn: data => {
        this.keys.add(data.key)
        this.values[data.key] = data.value
      },
    })
  }

  put(key: string, value: T): Promise<T> {
    this.keys.add(key)
    this.values[key] = value
    return this.level.put(key, value as any)
  }

  get(key: string): T {
    if (!this.keys.has(key)) {
      throw new Error(`unknown key: ${JSON.stringify(key)}`)
    }
    return this.values[key]
  }

  exists(key: string): boolean {
    return this.keys.has(key)
  }

  getKey(value: T): string {
    for (const key of this.keys) {
      if (this.values[key] === value) {
        return key
      }
    }
    throw new Error('record not found')
  }
}
