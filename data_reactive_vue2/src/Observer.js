import { def } from './utils'
import defineReactive from './defineReactive';

/**
 * 观察者模式
 * 
 */
export default class Observer {
  constructor(value) {
    // 给实例添加了__ob__属性，值是这次new的实例
    def(value, '__ob__', this, false)
    console.log("我是observer构造器:", value);
    this.walk(value)
  }
  // walk方法，对value就行遍历
  walk(value) {
    for (const key in value) {
      defineReactive(value, key)
    }
  }
}