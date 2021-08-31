import { observe } from "./observe";
/**
 * 封装dfineReactive函数
 * 构造了一个闭包环境，优化了defineProperty的操作
 * @param {Object} data 对象名
 * @param {String} key 要操作的属性名
 * @param {*} val 
 */
export default function defineReactive(data, key, val) {
  console.log("我是defineReactive属性", data, key);
  if (arguments.length == 2) {
    val = data[key]
  }

  // 子元素要进行observe，至此形成了递归，不是函数自调用，而是这几个方法之间进行循环调用
  let childOb = observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log("你在访问" + key + "的属性");
      return val
    },

    set(newVal) {
      console.log("你在修改" + key + "的属性值");
      if (val === newVal) return
      val = newVal

      // 当属性被设置了新值，这个新值也要进行
      childOb = observe(newVal)
    }
  })
}