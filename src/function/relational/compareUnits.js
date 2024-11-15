import { factory } from '../../utils/factory.js'

export const createCompareUnits = /* #__PURE__ */ factory(
  'compareUnits', ['typed'], ({ typed }) => ({
    'Unit, Unit': typed.referToSelf(self => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error('无法比较具有不同基数的单位')
      }
      return typed.find(self, [x.valueType(), y.valueType()])(x.value, y.value)
    })
  })
)
