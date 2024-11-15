/**
 * Create a syntax error with the message:
 *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
 * @param {string} fn     Function name
 * @param {number} count  Actual argument count
 * @param {number} min    Minimum required argument count
 * @param {number} [max]  Maximum required argument count
 * @extends Error
 */
export function ArgumentsError (fn, count, min, max) {
  if (!(this instanceof ArgumentsError)) {
    throw new SyntaxError('构造函数必须使用 new 运算符调用')
  }

  this.fn = fn
  this.count = count
  this.min = min
  this.max = max

  this.message = '函数 ' + fn + ' 参数数量错误 (已提供 ' + count + ' 个参数，需要 ' +
        min + ((max !== undefined && max !== null) ? ('-' + max) : '') + ' 个参数)'

  this.stack = (new Error()).stack
}

ArgumentsError.prototype = new Error()
ArgumentsError.prototype.constructor = Error
ArgumentsError.prototype.name = 'ArgumentsError'
ArgumentsError.prototype.isArgumentsError = true
