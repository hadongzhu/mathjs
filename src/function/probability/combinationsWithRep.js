import { factory } from '../../utils/factory.js'
import { isInteger } from '../../utils/number.js'
import { product } from '../../utils/product.js'

const name = 'combinationsWithRep'
const dependencies = ['typed']

export const createCombinationsWithRep = /* #__PURE__ */ factory(name, dependencies, ({ typed }) => {
  /**
   * Compute the number of ways of picking `k` unordered outcomes from `n`
   * possibilities, allowing individual outcomes to be repeated more than once.
   *
   * CombinationsWithRep only takes integer arguments.
   * The following condition must be enforced: k <= n + k -1.
   *
   * Syntax:
   *
   *     math.combinationsWithRep(n, k)
   *
   * Examples:
   *
   *    math.combinationsWithRep(7, 5) // returns 462
   *
   * See also:
   *
   *    combinations, permutations, factorial
   *
   * @param {number | BigNumber} n    Total number of objects in the set
   * @param {number | BigNumber} k    Number of objects in the subset
   * @return {number | BigNumber}     Number of possible combinations with replacement.
   */
  return typed(name, {
    'number, number': function (n, k) {
      if (!isInteger(n) || n < 0) {
        throw new TypeError('函数 combinationsWithRep 中应为正整数')
      }
      if (!isInteger(k) || k < 0) {
        throw new TypeError('函数 combinationsWithRep 中应为正整数')
      }
      if (n < 1) {
        throw new TypeError('k 必须小于或等于 n + k - 1')
      }

      if (k < n - 1) {
        const prodrange = product(n, n + k - 1)
        return prodrange / product(1, k)
      }
      const prodrange = product(k + 1, n + k - 1)
      return prodrange / product(1, n - 1)
    },

    'BigNumber, BigNumber': function (n, k) {
      const BigNumber = n.constructor
      let result, i
      const one = new BigNumber(1)
      const nMinusOne = n.minus(one)

      if (!isPositiveInteger(n) || !isPositiveInteger(k)) {
        throw new TypeError('函数 combinationsWithRep 中应为正整数')
      }
      if (n.lt(one)) {
        throw new TypeError('函数 combinationsWithRep 中的 k 必须小于或等于 n + k - 1')
      }

      result = one
      if (k.lt(nMinusOne)) {
        for (i = one; i.lte(nMinusOne); i = i.plus(one)) {
          result = result.times(k.plus(i)).dividedBy(i)
        }
      } else {
        for (i = one; i.lte(k); i = i.plus(one)) {
          result = result.times(nMinusOne.plus(i)).dividedBy(i)
        }
      }

      return result
    }
  })
})

/**
 * Test whether BigNumber n is a positive integer
 * @param {BigNumber} n
 * @returns {boolean} isPositiveInteger
 */
function isPositiveInteger (n) {
  return n.isInteger() && n.gte(0)
}
