import { errorTransform } from '../../transform/utils/errorTransform.js'
import { getSafeProperty } from '../../../utils/customs.js'

export function accessFactory ({ subset }) {
  /**
   * Retrieve part of an object:
   *
   * - Retrieve a property from an object
   * - Retrieve a part of a string
   * - Retrieve a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @return {Object | Array | Matrix | string} Returns the subset
   */
  return function access (object, index) {
    try {
      if (Array.isArray(object)) {
        return subset(object, index)
      } else if (object && typeof object.subset === 'function') { // Matrix
        return object.subset(index)
      } else if (typeof object === 'string') {
        // TODO: move getStringSubset into a separate util file, use that
        return subset(object, index)
      } else if (typeof object === 'object') {
        if (!index.isObjectProperty()) {
          throw new TypeError('无法将数值索引应用为对象属性')
        }

        return getSafeProperty(object, index.getObjectProperty())
      } else {
        throw new TypeError('无法应用索引：不支持的对象类型')
      }
    } catch (err) {
      throw errorTransform(err)
    }
  }
}
