import { numToStr, strToNum } from './number'

export type Field = {
  name: string
  type: FieldType
}

export enum FieldType {
  string,
  number,
  boolean,
  json,
  bigint,
  null,
  undefined,
}

export function mapFieldValue(value: any): { type: FieldType; str: string } {
  switch (typeof value) {
    case 'string':
      return {
        type: FieldType.string,
        str: value,
      }
    case 'number':
      return {
        type: FieldType.number,
        str: numToStr(value),
      }
    case 'boolean':
      return {
        type: FieldType.boolean,
        str: value ? 't' : 'f',
      }
    case 'bigint':
      return {
        type: FieldType.bigint,
        str: value.toString(16),
      }
    case 'undefined':
      return {
        type: FieldType.undefined,
        str: '',
      }
    case 'object':
      if (value === null) {
        return {
          type: FieldType.null,
          str: '',
        }
      }
      return {
        type: FieldType.json,
        str: JSON.stringify(value),
      }
    default:
      throw new TypeError(`unsupported type: ${typeof value}`)
  }
}

export function unmapFieldValue(type: FieldType, str: string) {
  switch (type) {
    case FieldType.string:
      return str
    case FieldType.number:
      return strToNum(str)
    case FieldType.boolean:
      return str === 't'
    case FieldType.bigint:
      return BigInt('0x' + str)
    case FieldType.undefined:
      return undefined
    case FieldType.null:
      return null
    case FieldType.json:
      return JSON.parse(str)
    default:
      throw new TypeError(`unsupported type: ${type} (${FieldType[type]})`)
  }
}
