let uid = 0
export default class Dep {
  constructor() {
    console.log("我是DEP的构造器");
    // 用数组来存储自己的订阅者,里面存放的时Watcher的实例
    this.subs = []
    this.id = uid++
  }

  /**
   * 更新通知
   */
  notify() {
    console.log("我是notify");
    // 浅克隆一份subs
    const subs = this.subs.slice()
    // 遍历
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }

  /**
   * 添加订阅
   */
  addSub(sub) {
    this.subs.push(sub)
  }

  /**
   * 添加依赖
   */
  depend(){
    // Dep.target就是我们自己指定的全局位置
    if(Dep.target){
      this.addSub(Dep.target)
    }
  }
}