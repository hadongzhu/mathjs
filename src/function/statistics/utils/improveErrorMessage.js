import { typeOf } from '../../../utils/is.js'

/**
 * Improve error messages for statistics functions. Errors are typically
 * thrown in an internally used function like larger, causing the error
 * not to mention the function (like max) which is actually used by the user.
 *
 * @param {Error} err
 * @param {String} fnName
 * @param {*} [value]
 * @return {Error}
 */
export function improveErrorMessage (err, fnName, value) {
  // TODO: add information with the index (also needs transform in expression parser)
  let details

  if (String(err).includes('不支持的类型')) {
    details = arguments.length > 2
      ? ' (类型: ' + typeOf(value) + ', 值: ' + JSON.stringify(value) + ')'
      : ' (类型: ' + err.data.actual + ')'

    return new TypeError('无法计算 ' + fnName + '，参数类型错误' + details)
  }

  if (String(err).includes('复数')) {
    details = arguments.length > 2
      ? ' (类型: ' + typeOf(value) + ', 值: ' + JSON.stringify(value) + ')'
      : ''

    return new TypeError('无法计算 ' + fnName + '，未定义复数排序关系' + details)
  }

  return err
}
