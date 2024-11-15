/**
 * Create a range error with the message:
 *     'Index out of range (index < min)'
 *     'Index out of range (index < max)'
 *
 * @param {number} index     The actual index
 * @param {number} [min=0]   Minimum index (included)
 * @param {number} [max]     Maximum index (excluded)
 * @extends RangeError
 */
export function IndexError (index, min, max) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError('构造函数必须使用 new 运算符调用')
  }

  this.index = index
  if (arguments.length < 3) {
    this.min = 0
    this.max = min
  } else {
    this.min = min
    this.max = max
  }

  if (this.min !== undefined && this.index < this.min) {
    this.message = '索引超出范围 (' + this.index + ' < ' + this.min + ')'
  } else if (this.max !== undefined && this.index >= this.max) {
    this.message = '索引超出范围 (' + this.index + ' > ' + (this.max - 1) + ')'
  } else {
    this.message = '索引超出范围 (' + this.index + ')'
  }

  this.stack = (new Error()).stack
}

IndexError.prototype = new RangeError()
IndexError.prototype.constructor = RangeError
IndexError.prototype.name = 'IndexError'
IndexError.prototype.isIndexError = true
