import { def } from "./utils"
// push，pop，shift，unshift，splice，sort， reverse重写
// 得到Array.prototype
const arrayPrototype = Array.prototype

// 以Array.prototype为原型创建arrayMethods对象,并暴漏出去
export const arrayMethods = Object.create(arrayPrototype)


// 要被改写的七个数组方法
const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodsName => {
  // 备份原来的方法
  const original = arrayPrototype[methodsName]
  // 定义新的方法
  def(arrayMethods, methodsName, function () {
    original.apply(this, arguments)
    console.log("啦啦啦啦");
  }, false)
})