import { def } from './utils'
import defineReactive from './defineReactive';
import {arrayMethods} from './array'

/**
 * 观察者模式
 */
export default class Observer {
  constructor(value) {
    // 给实例添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false)
    console.log("我是observer构造器:", value);
    // 检查他是数组还是对象
    if(Array.isArray(value)){
      // 如果是数组，将这个数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
    }else {
      this.walk(value)
    }
  }
  // walk方法，对value就行遍历
  walk(value) {
    for (const key in value) {
      defineReactive(value, key)
    }
  }
}