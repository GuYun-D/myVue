import vnode from './vnode'

/**
 * 只手写主干，不考虑h函数的重载，规定必须三个参数
 * @param {String} sel 选择器
 * @param {Object} data 数据 
 * @param {*} c 类型不确定，可能是String（文字），Array，Function（h函数）
 *  ________________________________________
 *  | type      |   style                  |
 *  ----------------------------------------
 *  | string    |   h('div', {}, 'text')   |
 *  | Array     |   h('div', {}, [])       |
 *  | Function  |   h('div', {}, h(...))   |
 */
export default function (sel, data, c) {
  // 检查参数的个数
  if (arguments.length !== 3) {
    throw new Error("h函数接收必须三个参数")
  }

  // 检查参数c的类型
  if (typeof c === "string" || typeof c === "number") {
    // type = string
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // type = Array

    // 收集children
    let children = []

    // 遍历c，并且c[i]必须是一个对象
    for (let i = 0; i < c.length; i++) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error("传入的数组参数中存在不合法h函数")
      }

      /**
       * 这里不需要手动执行c[i],因为
       * var vnode1 = h("div", {}, [
       *     h('p', {}, '哈哈'), 在这里就是执行了
       *     h('p', {}, '呵呵'),
       *     h('p', {}, '嘻嘻')
       *  ])
       * 
       * 只要把它收集起来
       */
      children.push(c[i])
    }

    // 循环结束，children收集完毕，return给vnode
    return vnode(sel, data, children, undefined, undefined)

  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 
  } else {
    throw new Error("参数三传入类型错误")
  }
}