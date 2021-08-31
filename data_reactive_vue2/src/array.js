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
    // 将arguments变成数组
    const args = [...arguments]
    /**
     * 要把这个数组的__ob__取出来，__ob__已经被添加了，因为数组坑定不是最高层
     * 比如：obj.g属性是数组，obj不是数组，第一次遍历obj这个对象的第一层的时候就已经给g属性(就是这个数组)添加了__ob__属性
     */
    const ob = this.__ob__;
    // 有三种方法，push，unshift，splice能够插入新项，现在要把插入的新项也变成observe的
    let inseted = []
    switch (methodsName) {
      case 'push':
      case 'unshift':
        inseted = args
        break;
      case 'splice':
        // splice(下标， 数量， 插入的新项)
        inseted = args.slice(2)
        break;
    }

    // 判断有没有插入的新项
    if (inseted.length > 0) {
      ob.observeArray(inseted)
    }

    let result = original.apply(this, arguments)
    console.log("啦啦啦啦");

    ob.dep.notify()
    return result
  }, false)
})