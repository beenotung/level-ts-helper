import Level from '@beenotung/level-ts'

export class CachedLevel<T> {
  private keys = new Set<string>()
  // key -> value
  private values: Record<string, T> = {}
  // value -> key
  private valueKeys = new Map<T, string>()

  constructor(private level: Level) {}

  get size() {
    return this.keys.size
  }

  async populateCache() {
    await this.level.eachSync({
      eachFn: data => {
        this.keys.add(data.key)
        this.values[data.key] = data.value
        this.valueKeys.set(data.value, data.key)
      },
    })
  }

  put(key: string, value: T): Promise<T> {
    this.keys.add(key)
    this.values[key] = value
    this.valueKeys.set(value, key)
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
    if (this.valueKeys.has(value)) {
      return this.valueKeys.get(value)!
    }
    throw new Error('record not found')
  }

  existsValue(value: T): boolean {
    return this.valueKeys.has(value)
  }

  /**
   * @remark unsorted
   * */
  getKeys(): string[] {
    return Array.from(this.keys)
  }

  /**
   * @remark unsorted
   * */
  getEntries(): Array<[string, T]> {
    return Object.entries(this.values)
  }
}
