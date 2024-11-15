import { factory } from '../../utils/factory.js'

export const createTrigUnit = /* #__PURE__ */ factory(
  'trigUnit', ['typed'], ({ typed }) => ({
    Unit: typed.referToSelf(self => x => {
      if (!x.hasBase(x.constructor.BASE_UNITS.ANGLE)) {
        throw new TypeError('函数 cot 中的单位不是角度')
      }
      return typed.find(self, x.valueType())(x.value)
    })
  })
)
