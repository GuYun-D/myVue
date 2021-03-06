import { def } from './utils'
import defineReactive from './defineReactive';
import {arrayMethods} from './array'
import { observe } from './observe';
import Dep from './Dep';

/**
 * 观察者模式
 */
export default class Observer {
  constructor(value) {
    // 实例化一个dep，每一个Observer的实例身上，都有一个dep，每一个层次都会有一个dep
    this.dep = new Dep();

    // 给实例添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false)
    console.log("我是observer构造器:", value);
    // 检查他是数组还是对象
    if(Array.isArray(value)){
      // 如果是数组，将这个数组的原型指向arrayMethods
      Object.setPrototypeOf(value, arrayMethods)
      // 让这个数组变成响应式的
      this.observeArray(value)
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

  // 让数组变成响应式
  observeArray(arr){
    for(let i = 0, l = arr.length; i < l; i++){
      // 对数组每一个元素逐个observe
      observe(arr[i])
    }
  }
}