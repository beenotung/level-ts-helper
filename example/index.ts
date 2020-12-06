import { RefDatabase } from '@beenotung/level-ts-helper'

async function main() {
  let db = new RefDatabase('data')
  await db.init()
  await db.put('sample', { id: 1, username: 'Alice' })
  let user = await db.get('sample')
  console.log(user)
}

main()
