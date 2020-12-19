import Level from '@beenotung/level-ts'
import { expect } from 'chai'
import { prepareDBDir } from '../test/helper'
import { CachedLevel } from './cached-level'
import { CachedValLevel } from './cached-val-level'

describe('cached-val-level.ts spec', function () {
  let dir = prepareDBDir('cached-val-level')
  let level = new Level(dir)
  it('should reuse same key for duplicated records', async function () {
    let db = new CachedValLevel(new CachedLevel(level))
    let key1 = await db.storeValue('one')
    let key2 = await db.storeValue('one')
    expect(key1).to.equals(key2)
  })
})
