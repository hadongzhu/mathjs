import { factory } from '../../utils/factory.js'
import { isMatrix } from '../../utils/is.js'
import { clone } from '../../utils/object.js'
import { validateIndex } from '../../utils/array.js'

const name = 'column'
const dependencies = ['typed', 'Index', 'matrix', 'range']

export const createColumn = /* #__PURE__ */ factory(name, dependencies, ({ typed, Index, matrix, range }) => {
  /**
   * Return a column from a Matrix.
   *
   * Syntax:
   *
   *     math.column(value, index)
   *
   * Example:
   *
   *     // get a column
   *     const d = [[1, 2], [3, 4]]
   *     math.column(d, 1) // returns [[2], [4]]
   *
   * See also:
   *
   *     row
   *
   * @param {Array | Matrix } value   An array or matrix
   * @param {number} column           The index of the column
   * @return {Array | Matrix}         The retrieved column
   */
  return typed(name, {
    'Matrix, number': _column,

    'Array, number': function (value, column) {
      return _column(matrix(clone(value)), column).valueOf()
    }
  })

  /**
   * Retrieve a column of a matrix
   * @param {Matrix } value  A matrix
   * @param {number} column  The index of the column
   * @return {Matrix}        The retrieved column
   */
  function _column (value, column) {
    // check dimensions
    if (value.size().length !== 2) {
      throw new Error('仅支持二维矩阵')
    }

    validateIndex(column, value.size()[1])

    const rowRange = range(0, value.size()[0])
    const index = new Index(rowRange, column)
    const result = value.subset(index)
    return isMatrix(result)
      ? result
      : matrix([[result]])
  }
})
