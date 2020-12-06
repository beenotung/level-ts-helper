import { numToStr, strToNum } from './number'

it('should have right sample', function () {
  expect((42).toString(36)).toBe('16')
})

it(`should encode positive integer`, () => {
  expect(numToStr(42)).toBe('16')
})

it(`should encode negative integer`, () => {
  expect(numToStr(-42)).toBe('-16')
})

it(`should encode positive float`, () => {
  expect(numToStr(42.42)).toBe('16.16')
})

it(`should encode negative float`, () => {
  expect(numToStr(-42.42)).toBe('-16.16')
})

it(`should decode positive integer`, () => {
  expect(strToNum('16')).toBe(42)
})

it(`should decode negative integer`, () => {
  expect(strToNum('-16')).toBe(-42)
})

it(`should decode positive float`, () => {
  expect(strToNum('16.16')).toBe(42.42)
})

it(`should decode negative float`, () => {
  expect(strToNum('-16.16')).toBe(-42.42)
})
