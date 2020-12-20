import { expect } from 'chai'
import * as rimraf from 'rimraf'
import { copyDir, prepareDBDir } from '../test/helper'
import { RefDatabase } from './ref-database'

describe('RefDatabase TestSuit', () => {
  let dir = prepareDBDir('ref-db')
  let db: RefDatabase<any>

  before(async () => {
    db = new RefDatabase(dir)
    await db.init()
  })

  it('should store object', async function () {
    await db.put('sample', { id: 1, username: 'Alice' })
  })

  it('should get object', async function () {
    await db.get('sample')
  })

  it('should preserve object value', async function () {
    expect(await db.get('sample')).deep.equals({ id: 1, username: 'Alice' })
  })

  it('should preserve nested object', async function () {
    let a = { id: 123, tags: ['1', '2', '3'] }
    await db.put('a', a)
    expect(await db.get('a')).deep.equals(a)
  })

  it('should preserve complex nested object', async function () {
    let int = 42
    let str = 'I am a text'
    let a = {
      int,
      str,
      arr: [int, str, { int, str }],
      obj: { int, str, arr: [int, str, { int, str }] },
    }
    await db.put('a', JSON.parse(JSON.stringify(a)))
    expect(await db.get('a')).deep.equals(a)
  })

  let dir2 = prepareDBDir('ref-db-2')
  let db2: RefDatabase<any>
  it('should load existing data', async function () {
    copyDir(dir, dir2)
    db2 = new RefDatabase<any>(dir2)
    await db2.forceSync()
  })
  it('should expose existing keys', async function () {
    expect(await db2.keys()).includes('sample')
    expect(await db2.exists('sample')).be.true
  })
})
