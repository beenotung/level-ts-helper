import { Field } from './internal/field'
import { fromSchemaObject, toSchemaObject } from './internal/schema'
import { KeyValLevel } from './key-val-level'
import { LevelDatabase } from './level-database'

// [schema_id, value_ids]
type RefObject = [string, string[]]

export class RefDatabase<T extends object> {
  private levelDatabase = new LevelDatabase(this.dir)
  private objects = this.levelDatabase.getTable<RefObject>('objects')
  private kvs = new KeyValLevel(
    this.levelDatabase.getTable('vals'),
    this.levelDatabase.getTable('vals-idx'),
  )
  private schemas = this.levelDatabase.getCachedValTable('schemas')

  constructor(private dir: string) {}

  async init() {
    await Promise.all([this.kvs.init(), this.schemas.init()])
  }

  async forceSync() {
    await Promise.all([this.kvs.sync(), this.schemas.init()])
  }

  async keys(): Promise<string[]> {
    return this.objects.stream({ values: false })
  }

  async put(key: string, value: T) {
    const { fields, values } = toSchemaObject(value)
    const payload: RefObject = await Promise.all([
      this.storeSchema(fields),
      Promise.all(values.map(value => this.kvs.storeValue(value))),
    ])
    await this.objects.put(key, payload)
  }

  exists(key: string): Promise<boolean> {
    return this.objects.exists(key)
  }

  async get(key: string): Promise<T> {
    const [schema_id, value_ids]: RefObject = await this.objects.get(key)
    const fields: Field[] = this.getSchema(schema_id)
    const values = await Promise.all(
      value_ids.map(value_id => this.kvs.getValue(value_id)),
    )
    const value: object = fromSchemaObject({ fields, values })
    return value as any
  }

  private storeSchema(fields: Field[]): Promise<string> {
    const schema = JSON.stringify(fields)
    return this.schemas.storeValue(schema)
  }

  private getSchema(id: string): Field[] {
    const schema = this.schemas.getValue(id)
    return JSON.parse(schema)
  }
}
