import { arraySize as size } from '../../utils/array.js'
import { factory } from '../../utils/factory.js'

const name = 'kron'
const dependencies = ['typed', 'matrix', 'multiplyScalar']

export const createKron = /* #__PURE__ */ factory(name, dependencies, ({ typed, matrix, multiplyScalar }) => {
  /**
     * Calculates the Kronecker product of 2 matrices or vectors.
     *
     * NOTE: If a one dimensional vector / matrix is given, it will be
     * wrapped so its two dimensions.
     * See the examples.
     *
     * Syntax:
     *
     *    math.kron(x, y)
     *
     * Examples:
     *
     *    math.kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])
     *    // returns [ [ 1, 2, 0, 0 ], [ 3, 4, 0, 0 ], [ 0, 0, 1, 2 ], [ 0, 0, 3, 4 ] ]
     *
     *    math.kron([1,1], [2,3,4])
     *    // returns [ [ 2, 3, 4, 2, 3, 4 ] ]
     *
     * See also:
     *
     *    multiply, dot, cross
     *
     * @param  {Array | Matrix} x     First vector
     * @param  {Array | Matrix} y     Second vector
     * @return {Array | Matrix}       Returns the Kronecker product of `x` and `y`
     */
  return typed(name, {
    'Matrix, Matrix': function (x, y) {
      return matrix(_kron(x.toArray(), y.toArray()))
    },

    'Matrix, Array': function (x, y) {
      return matrix(_kron(x.toArray(), y))
    },

    'Array, Matrix': function (x, y) {
      return matrix(_kron(x, y.toArray()))
    },

    'Array, Array': _kron
  })

  /**
     * Calculate the Kronecker product of two matrices / vectors
     * @param {Array} a  First vector
     * @param {Array} b  Second vector
     * @returns {Array} Returns the Kronecker product of x and y
     * @private
     */
  function _kron (a, b) {
    // Deal with the dimensions of the matricies.
    if (size(a).length === 1) {
      // Wrap it in a 2D Matrix
      a = [a]
    }
    if (size(b).length === 1) {
      // Wrap it in a 2D Matrix
      b = [b]
    }
    if (size(a).length > 2 || size(b).length > 2) {
      throw new RangeError('不支持维度大于 2 的向量，应为 ' +
      '(大小 x = ' + JSON.stringify(a.length) + ', y = ' + JSON.stringify(b.length) + ')')
    }
    const t = []
    let r = []

    return a.map(function (a) {
      return b.map(function (b) {
        r = []
        t.push(r)
        return a.map(function (y) {
          return b.map(function (x) {
            return r.push(multiplyScalar(y, x))
          })
        })
      })
    }) && t
  }
})
