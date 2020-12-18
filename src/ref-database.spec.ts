import { expect } from 'chai'
import * as rimraf from 'rimraf'
import { RefDatabase } from './ref-database'

let dir = 'data'
let db: RefDatabase<any>

before(async () => {
  rimraf.sync(dir)
  db = new RefDatabase(dir)
  await db.init()
})

after(async () => {
  rimraf.sync(dir)
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
