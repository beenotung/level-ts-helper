import { Field, mapFieldValue, unmapFieldValue } from './field'

export type SchemaObject = {
  fields: Field[]
  values: string[]
}

export function toSchemaObject(object: object): SchemaObject {
  const fields: Field[] = []
  const values: string[] = []
  for (const [key, value] of Object.entries(object)) {
    const { type, str } = mapFieldValue(value)
    fields.push({ name: key, type })
    values.push(str)
  }
  return { fields, values }
}

export function fromSchemaObject({ fields, values }: SchemaObject): object {
  const result: any = {}
  const n = fields.length
  for (let i = 0; i < n; i++) {
    const field = fields[i]
    result[field.name] = unmapFieldValue(field.type, values[i])
  }
  return result
}
