import * as fs from 'fs'
import { RefDatabase } from './ref-database'

let dir = 'data'
let db: RefDatabase<any>

beforeAll(async () => {
  if (fs.existsSync(dir)) {
    fs.rmdirSync(dir, { recursive: true })
  }
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
  expect(db.get('sample')).resolves.toEqual({ id: 1, username: 'Alice' })
})
