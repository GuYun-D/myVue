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
export default function (sel, data, c){
  // 检查参数的个数
  if(arguments.length !== 3){
    throw new Error("h函数接收必须三个参数")
  }

  // 检查参数c的类型
  if(typeof c === "string" || typeof c === "number"){
    // type = string
    return vnode(sel, data, undefined, c, undefined)
  }else if(Array.isArray(c)){
    // type = Array

  }else if(typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 
  }else {
    throw new Error("参数三传入类型错误")
  }
}