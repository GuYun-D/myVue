import Observer from './Observer'
/**
 * @param {Object} value 要添加响应式的对象
 * @returns 
 */
export const observe = function (value) {
  // 该函数只对对象服务，所以先进行判断
  if (typeof value != 'object') return

  // 定义ob
  var ob;

  if (typeof value.__ob__ !== 'undefined') {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }

  return ob
}