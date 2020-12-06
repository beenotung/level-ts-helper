import * as rimraf from 'rimraf'
import { RefDatabase } from './ref-database'

let dir = 'data'
let db: RefDatabase<any>

beforeAll(async () => {
  rimraf.sync(dir)
  db = new RefDatabase(dir)
  await db.init()
})

afterAll(async () => {
  rimraf.sync(dir)
})

it('should store object', async function () {
  await db.put('sample', { id: 1, username: 'Alice' })
})

it('should get object', async function () {
  await db.get('sample')
})

it('should preserve object value', async function () {
  expect(db.get('sample')).resolves.toEqual({ id: 1, username: 'Alice' })
})
