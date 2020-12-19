import { expect } from 'chai'
import { fromSchemaObject, toSchemaObject } from './schema'

describe('Schema TestSuit', () => {
  function test(name: string, sample: object) {
    it('should encode ' + name, function () {
      let object = toSchemaObject(sample)
    })
    it('should decode ' + name, function () {
      let object = toSchemaObject(sample)
      let result = fromSchemaObject(object)
    })
    it('should preserve value of ' + name, function () {
      let object = toSchemaObject(sample)
      let result = fromSchemaObject(object)
      expect(result).deep.equals(sample)
    })
  }

  test('empty object', {})
  test('simple object', { id: 1, username: 'Alice' })
  test('nest object', { id: 1, user: { id: 2, name: 'Alice' } })
  test('object with array', {
    id: 1,
    title: 'hello',
    comments: ['world', 'jest'],
  })
  test('complex object', {
    id: 1,
    user: { id: 2, name: 'Alice' },
    friends: [{ id: 3 }, { id: 4 }],
  })
})
