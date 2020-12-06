import Level from '@beenotung/level-ts'

export class KeyValLevel {
  private count!: number

  constructor(
    private keyValues: Level<string>,
    private valueKeys: Level<string>,
  ) {}

  async init() {
    const [keyCount, valueCount] = await Promise.all([
      this.keyValues.count(),
      this.valueKeys.count(),
    ])
    if (keyCount === valueCount) {
      this.count = keyCount
      return
    }
    await this.sync()
  }

  async sync() {
    await this.keyValues.eachAsync({
      eachFn: async data => {
        await this.valueKeys.put(data.value, data.key)
      },
    })
  }

  /** @returns key */
  async storeValue(value: string): Promise<string> {
    if (value === '') {
      return ''
    }
    if (await this.valueKeys.exists(value)) {
      return this.valueKeys.get(value)
    }
    this.count++
    const key = this.count.toString(36)
    await Promise.all([
      this.keyValues.put(key, value),
      this.valueKeys.put(value, key),
    ])
    return key
  }

  async getValue(key: string): Promise<string> {
    if (key === '') {
      return ''
    }
    return this.keyValues.get(key)
  }
}
