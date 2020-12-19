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
  let db = new CachedLevel(level)
  it('should populate cache', async () => {
    await db.populateCache()
  })
  it('should get existing data', async () => {
    expect(await db.get('one')).equals(1)
    expect(await db.get('two')).equals(2)
    expect(await db.get('three')).equals(3)
  })
  it('should throw error when get non-existing value', async () => {
    expect(() => db.get('404')).throws(`unknown key: "404"`)
  })
  it('should throw error when get non-existing key', function () {
    expect(() => db.getKey('404')).throws('record not found')
  })
})
