import Level from '@beenotung/level-ts'
import { expect } from 'chai'
import { prepareDBDir } from '../test/helper'
import { CachedLevel } from './cached-level'

describe('cached-level.ts spec', function () {
  let dir = prepareDBDir('cached-level')
  let level = new Level(dir)
  before('populate data', async () => {
    let db = new CachedLevel(level)
    await db.put('one', 1)
    await db.put('two', 2)
    await db.put('three', 3)
  })
  let db = new CachedLevel<number>(level)
  it('should populate cache', async () => {
    await db.populateCache()
  })
  it('should get existing data', async () => {
    expect(await db.get('one')).equals(1)
    expect(await db.get('two')).equals(2)
    expect(await db.get('three')).equals(3)
  })
  it('should check if key exists', async () => {
    await db.put('exist', 1)
    expect(db.exists('exist')).true
  })
  it('should delete by key', async () => {
    await db.del('exist')
    expect(db.exists('exist')).false
  })
  it('should throw error when get non-existing value', async () => {
    expect(() => db.get('404')).throws(`unknown key: "404"`)
  })
  it('should throw error when get non-existing key', function () {
    expect(() => db.getKey('404')).throws('record not found')
  })
  it('should lookup key by value', () => {
    expect(db.getKey(2)).equals('two')
  })
  it('should check existence of value', () => {
    expect(db.existsValue(2)).true
    expect(db.existsValue(4)).false
  })
  it('should return cached list of keys', function () {
    expect(db.getKeys().sort(compare)).deep.equals(
      ['one', 'two', 'three'].sort(compare),
    )
  })
  it('should return cached list of key-value entries', function () {
    expect(db.getEntries().sort(compare)).deep.equals(
      [
        ['one', 1],
        ['two', 2],
        ['three', 3],
      ].sort(compare),
    )
  })
})

function compare(a: any, b: any) {
  a = JSON.stringify(a)
  b = JSON.stringify(b)
  return a === b ? 0 : a > b ? 1 : -1
}
