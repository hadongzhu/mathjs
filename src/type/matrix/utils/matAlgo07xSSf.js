import { factory } from '../../../utils/factory.js'
import { DimensionError } from '../../../error/DimensionError.js'

const name = 'matAlgo07xSSf'
const dependencies = ['typed', 'DenseMatrix']

export const createMatAlgo07xSSf = /* #__PURE__ */ factory(name, dependencies, ({ typed, DenseMatrix }) => {
  /**
   * Iterates over SparseMatrix A and SparseMatrix B items (zero and nonzero) and invokes the callback function f(Aij, Bij).
   * Callback function invoked MxN times.
   *
   * C(i,j) = f(Aij, Bij)
   *
   * @param {Matrix}   a                 The SparseMatrix instance (A)
   * @param {Matrix}   b                 The SparseMatrix instance (B)
   * @param {Function} callback          The f(Aij,Bij) operation to invoke
   *
   * @return {Matrix}                    DenseMatrix (C)
   *
   * see https://github.com/josdejong/mathjs/pull/346#issuecomment-97620294
   */
  return function matAlgo07xSSf (a, b, callback) {
    // sparse matrix arrays
    const asize = a._size
    const adt = a._datatype || a._data === undefined ? a._datatype : a.getDataType()
    // sparse matrix arrays
    const bsize = b._size
    const bdt = b._datatype || b._data === undefined ? b._datatype : b.getDataType()

    // validate dimensions
    if (asize.length !== bsize.length) { throw new DimensionError(asize.length, bsize.length) }

    // check rows & columns
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) { throw new RangeError('维度不匹配。矩阵 A (' + asize + ') 必须与矩阵 B (' + bsize + ') 匹配') }

    // rows & columns
    const rows = asize[0]
    const columns = asize[1]

    // datatype
    let dt
    // zero value
    let zero = 0
    // callback signature to use
    let cf = callback

    // process data types
    if (typeof adt === 'string' && adt === bdt && adt !== 'mixed') {
      // datatype
      dt = adt
      // convert 0 to the same datatype
      zero = typed.convert(0, dt)
      // callback
      cf = typed.find(callback, [dt, dt])
    }

    // vars
    let i, j

    // result arrays
    const cdata = []
    // initialize c
    for (i = 0; i < rows; i++) { cdata[i] = [] }

    // workspaces
    const xa = []
    const xb = []
    // marks indicating we have a value in x for a given column
    const wa = []
    const wb = []

    // loop columns
    for (j = 0; j < columns; j++) {
      // columns mark
      const mark = j + 1
      // scatter the values of A(:,j) into workspace
      _scatter(a, j, wa, xa, mark)
      // scatter the values of B(:,j) into workspace
      _scatter(b, j, wb, xb, mark)
      // loop rows
      for (i = 0; i < rows; i++) {
        // matrix values @ i,j
        const va = wa[i] === mark ? xa[i] : zero
        const vb = wb[i] === mark ? xb[i] : zero
        // invoke callback
        cdata[i][j] = cf(va, vb)
      }
    }

    // return dense matrix
    return new DenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : undefined
    })
  }

  function _scatter (m, j, w, x, mark) {
    // a arrays
    const values = m._values
    const index = m._index
    const ptr = m._ptr
    // loop values in column j
    for (let k = ptr[j], k1 = ptr[j + 1]; k < k1; k++) {
      // row
      const i = index[k]
      // update workspace
      w[i] = mark
      x[i] = values[k]
    }
  }
})
