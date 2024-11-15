import { isInteger } from '../../utils/number.js'
import { product } from '../../utils/product.js'

export function combinationsNumber (n, k) {
  if (!isInteger(n) || n < 0) {
    throw new TypeError('函数 combinations 中应为正整数')
  }
  if (!isInteger(k) || k < 0) {
    throw new TypeError('函数 combinations 中应为正整数')
  }
  if (k > n) {
    throw new TypeError('k 必须小于或等于 n')
  }

  const nMinusk = n - k

  let answer = 1
  const firstnumerator = (k < nMinusk) ? nMinusk + 1 : k + 1
  let nextdivisor = 2
  const lastdivisor = (k < nMinusk) ? k : nMinusk
  // balance multiplications and divisions to try to keep intermediate values
  // in exact-integer range as long as possible
  for (let nextnumerator = firstnumerator; nextnumerator <= n; ++nextnumerator) {
    answer *= nextnumerator
    while (nextdivisor <= lastdivisor && answer % nextdivisor === 0) {
      answer /= nextdivisor
      ++nextdivisor
    }
  }
  // for big n, k, floating point may have caused weirdness in remainder
  if (nextdivisor <= lastdivisor) {
    answer /= product(nextdivisor, lastdivisor)
  }
  return answer
}
combinationsNumber.signature = 'number, number'
