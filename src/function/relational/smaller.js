import { nearlyEqual as bigNearlyEqual } from '../../utils/bignumber/nearlyEqual.js'
import { nearlyEqual } from '../../utils/number.js'
import { factory } from '../../utils/factory.js'
import { createMatAlgo03xDSf } from '../../type/matrix/utils/matAlgo03xDSf.js'
import { createMatAlgo07xSSf } from '../../type/matrix/utils/matAlgo07xSSf.js'
import { createMatAlgo12xSfs } from '../../type/matrix/utils/matAlgo12xSfs.js'
import { createMatrixAlgorithmSuite } from '../../type/matrix/utils/matrixAlgorithmSuite.js'
import { createCompareUnits } from './compareUnits.js'

const name = 'smaller'
const dependencies = [
  'typed',
  'config',
  'matrix',
  'DenseMatrix',
  'concat'
]

export const createSmaller = /* #__PURE__ */ factory(name, dependencies, ({ typed, config, matrix, DenseMatrix, concat }) => {
  const matAlgo03xDSf = createMatAlgo03xDSf({ typed })
  const matAlgo07xSSf = createMatAlgo07xSSf({ typed, DenseMatrix })
  const matAlgo12xSfs = createMatAlgo12xSfs({ typed, DenseMatrix })
  const matrixAlgorithmSuite = createMatrixAlgorithmSuite({ typed, matrix, concat })
  const compareUnits = createCompareUnits({ typed })

  /**
   * Test whether value x is smaller than y.
   *
   * The function returns true when x is smaller than y and the relative
   * difference between x and y is smaller than the configured relTol and absTol. The
   * function cannot be used to compare values smaller than approximately 2.22e-16.
   *
   * For matrices, the function is evaluated element wise.
   * Strings are compared by their numerical value.
   *
   * Syntax:
   *
   *    math.smaller(x, y)
   *
   * Examples:
   *
   *    math.smaller(2, 3)            // returns true
   *    math.smaller(5, 2 * 2)        // returns false
   *
   *    const a = math.unit('5 cm')
   *    const b = math.unit('2 inch')
   *    math.smaller(a, b)            // returns true
   *
   * See also:
   *
   *    equal, unequal, smallerEq, smaller, smallerEq, compare
   *
   * @param  {number | BigNumber | bigint | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
   * @param  {number | BigNumber | bigint | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
   */
  return typed(
    name,
    createSmallerNumber({ typed, config }),
    {
      'boolean, boolean': (x, y) => x < y,

      'BigNumber, BigNumber': function (x, y) {
        return x.lt(y) && !bigNearlyEqual(x, y, config.relTol, config.absTol)
      },

      'bigint, bigint': (x, y) => x < y,

      'Fraction, Fraction': (x, y) => (x.compare(y) === -1),

      'Complex, Complex': function (x, y) {
        throw new TypeError('未定义复数排序关系')
      }
    },
    compareUnits,
    matrixAlgorithmSuite({
      SS: matAlgo07xSSf,
      DS: matAlgo03xDSf,
      Ss: matAlgo12xSfs
    })
  )
})

export const createSmallerNumber = /* #__PURE__ */ factory(name, ['typed', 'config'], ({ typed, config }) => {
  return typed(name, {
    'number, number': function (x, y) {
      return x < y && !nearlyEqual(x, y, config.relTol, config.absTol)
    }
  })
})
