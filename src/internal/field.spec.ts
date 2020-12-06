import { mapFieldValue, unmapFieldValue } from './field'

describe('Field TestSuit', () => {
  let samples: any[] = [
    'Alice',
    42,
    21.21,
    true,
    false,
    BigInt(12),
    undefined,
    null,
    { id: 1, username: 'alice', friends: [2, 3, 4] },
    [1, 2, 3, 4],
  ]
  for (let sample of samples) {
    let type = typeof sample
    it(`should map ${type}`, function () {
      let { type, str } = mapFieldValue(sample)
    })
    it(`should unmap ${type}`, () => {
      let { type, str } = mapFieldValue(sample)
      let value = unmapFieldValue(type, str)
    })
    it(`should preserve original value of ${type}`, function () {
      let { type, str } = mapFieldValue(sample)
      let value = unmapFieldValue(type, str)
      expect(value).toEqual(sample)
    })
  }
})
