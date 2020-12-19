import Level from '@beenotung/level-ts'
import { expect } from 'chai'
import { prepareDBDir } from '../test/helper'
import { KeyValLevel } from './key-val-level'

describe('key-val-level.ts spec', function () {
  let keyDir = prepareDBDir('key-val-level')
  let valDir = prepareDBDir('key-val-level-idx')
  let keyLevel = new Level(keyDir)
  let valLevel = new Level(valDir)
  let key1: string
  let key2: string
  it('should store value', async () => {
    let db = new KeyValLevel(keyLevel, valLevel)
    await db.init()
    key1 = await db.storeValue('one')
  })
  it('should remember last size', async function () {
    let db = new KeyValLevel(keyLevel, valLevel)
    await db.init()
    key2 = await db.storeValue('two')
    expect(key1).not.equals(key2)
  })
  it('should get back value', async function () {
    let db = new KeyValLevel(keyLevel, valLevel)
    await db.init()
    expect(await db.getValue(key1)).equals('one')
    expect(await db.getValue(key2)).equals('two')
  })
  it('should auto rebuild index', async function () {
    let valDir = prepareDBDir('key-val-level-idx-2')
    let db = new KeyValLevel(keyLevel, new Level(valDir))
    await db.init()
    expect(await db.getValue(key1)).equals('one')
    expect(await db.getValue(key2)).equals('two')
  })
  it('should store empty value', async function () {
    let db = new KeyValLevel(keyLevel, valLevel)
    await db.init()
    let key = await db.storeValue('')
    expect(await db.getValue(key)).equals('')
  })
  it('should not store duplicated value', async function () {
    let db = new KeyValLevel(keyLevel, valLevel)
    await db.init()
    let key1 = await db.storeValue('123')
    let key2 = await db.storeValue('123')
    expect(key1).to.equals(key2)
  })
})
