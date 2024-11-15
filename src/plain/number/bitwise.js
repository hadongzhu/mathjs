import { isInteger } from '../../utils/number.js'

const n1 = 'number'
const n2 = 'number, number'

export function bitAndNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 bitAnd 中应为整数')
  }

  return x & y
}
bitAndNumber.signature = n2

export function bitNotNumber (x) {
  if (!isInteger(x)) {
    throw new Error('函数 bitNot 中应为整数')
  }

  return ~x
}
bitNotNumber.signature = n1

export function bitOrNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 bitOr 中应为整数')
  }

  return x | y
}
bitOrNumber.signature = n2

export function bitXorNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 bitXor 中应为整数')
  }

  return x ^ y
}
bitXorNumber.signature = n2

export function leftShiftNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 leftShift 中应为整数')
  }

  return x << y
}
leftShiftNumber.signature = n2

export function rightArithShiftNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 rightArithShift 中应为整数')
  }

  return x >> y
}
rightArithShiftNumber.signature = n2

export function rightLogShiftNumber (x, y) {
  if (!isInteger(x) || !isInteger(y)) {
    throw new Error('函数 rightLogShift 中应为整数')
  }

  return x >>> y
}
rightLogShiftNumber.signature = n2
