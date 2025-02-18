import { factory } from '../../utils/factory.js'
import { isMatrix } from '../../utils/is.js'
import { clone } from '../../utils/object.js'
import { validateIndex } from '../../utils/array.js'

const name = 'row'
const dependencies = ['typed', 'Index', 'matrix', 'range']

export const createRow = /* #__PURE__ */ factory(name, dependencies, ({ typed, Index, matrix, range }) => {
  /**
   * Return a row from a Matrix.
   *
   * Syntax:
   *
   *     math.row(value, index)
   *
   * Example:
   *
   *     // get a row
   *     const d = [[1, 2], [3, 4]]
   *     math.row(d, 1) // returns [[3, 4]]
   *
   * See also:
   *
   *     column
   *
   * @param {Array | Matrix } value   An array or matrix
   * @param {number} row              The index of the row
   * @return {Array | Matrix}         The retrieved row
   */
  return typed(name, {
    'Matrix, number': _row,

    'Array, number': function (value, row) {
      return _row(matrix(clone(value)), row).valueOf()
    }
  })

  /**
   * Retrieve a row of a matrix
   * @param {Matrix } value  A matrix
   * @param {number} row     The index of the row
   * @return {Matrix}        The retrieved row
   */
  function _row (value, row) {
    // check dimensions
    if (value.size().length !== 2) {
      throw new Error('仅支持二维矩阵')
    }

    validateIndex(row, value.size()[0])

    const columnRange = range(0, value.size()[1])
    const index = new Index(row, columnRange)
    const result = value.subset(index)
    return isMatrix(result)
      ? result
      : matrix([[result]])
  }
})
