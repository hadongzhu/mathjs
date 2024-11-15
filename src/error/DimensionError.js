/**
 * Create a range error with the message:
 *     'Dimension mismatch (<actual size> != <expected size>)'
 * @param {number | number[]} actual        The actual size
 * @param {number | number[]} expected      The expected size
 * @param {string} [relation='!=']          Optional relation between actual
 *                                          and expected size: '!=', '<', etc.
 * @extends RangeError
 */
export function DimensionError (actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError('构造函数必须使用 new 运算符调用')
  }

  this.actual = actual
  this.expected = expected
  this.relation = relation

  this.message = '维度不匹配 (' +
      (Array.isArray(actual) ? ('[' + actual.join(', ') + ']') : actual) +
      ' ' + (this.relation || '!=') + ' ' +
      (Array.isArray(expected) ? ('[' + expected.join(', ') + ']') : expected) +
      ')'

  this.stack = (new Error()).stack
}

DimensionError.prototype = new RangeError()
DimensionError.prototype.constructor = RangeError
DimensionError.prototype.name = 'DimensionError'
DimensionError.prototype.isDimensionError = true
