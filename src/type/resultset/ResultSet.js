import { factory } from '../../utils/factory.js'

const name = 'ResultSet'
const dependencies = []

export const createResultSet = /* #__PURE__ */ factory(name, dependencies, () => {
  /**
   * A ResultSet contains a list or results
   * @class ResultSet
   * @param {Array} entries
   * @constructor ResultSet
   */
  function ResultSet (entries) {
    if (!(this instanceof ResultSet)) {
      throw new SyntaxError('构造函数必须使用 new 运算符调用')
    }

    this.entries = entries || []
  }

  /**
   * Attach type information
   */
  ResultSet.prototype.type = 'ResultSet'
  ResultSet.prototype.isResultSet = true

  /**
   * Returns the array with results hold by this ResultSet
   * @memberof ResultSet
   * @returns {Array} entries
   */
  ResultSet.prototype.valueOf = function () {
    return this.entries
  }

  /**
   * Returns the stringified results of the ResultSet
   * @memberof ResultSet
   * @returns {string} string
   */
  ResultSet.prototype.toString = function () {
    return '[' + this.entries.join(', ') + ']'
  }

  /**
   * Get a JSON representation of the ResultSet
   * @memberof ResultSet
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "ResultSet", "entries": [...]}`
   */
  ResultSet.prototype.toJSON = function () {
    return {
      mathjs: 'ResultSet',
      entries: this.entries
    }
  }

  /**
   * Instantiate a ResultSet from a JSON object
   * @memberof ResultSet
   * @param {Object} json  A JSON object structured as:
   *                       `{"mathjs": "ResultSet", "entries": [...]}`
   * @return {ResultSet}
   */
  ResultSet.fromJSON = function (json) {
    return new ResultSet(json.entries)
  }

  return ResultSet
}, { isClass: true })
