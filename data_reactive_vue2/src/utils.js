/**
 * 定义obj的key属性的操作符,将__ob__定义为不可枚举
 * @param {Object} obj 
 * @param {String} key 
 * @param {*} value 
 * @param {Boolean} enumerable 
 */
export const def = function(obj, key, value, enumerable){
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    configurable: true,
    writable: true
  })
} 