export function numToStr(num: number): string {
  const str = num.toString()
  const parts = str.split('.')
  const a = (+parts[0]).toString(36)
  if (parts.length === 1) {
    return a
  }
  const b = (+parts[1]).toString(36)
  return `${a}.${b}`
}

export function strToNum(str: string): number {
  const parts = str.split('.')
  const a = parseInt(parts[0], 36)
  if (parts.length === 1) {
    return a
  }
  const b = parseInt(parts[1], 36)
  return +`${a}.${b}`
}
