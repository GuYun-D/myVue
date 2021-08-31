import { observe } from "./observe"
import Watcher from "./Watcher"

var obj = {
  a: {
    m: {
      n: 112
    }
  },
  b: 10,
  /**
   * 数组响应式的实现就是通过修改数组的7个方法
   * push，pop，shift，unshift，splice，sort， reverse被重写了
   */
  c: ["1", "2", "3"]
}

observe(obj)

// obj.c.push("4", "23", "21")
// obj.c.splice(2, 1, "哈啊哈哈哈哈哈")

obj.a.m.n = 1

new Watcher(obj, 'a.m.n', (val) => {
  console.log("^^^^^^^^^^^^^", val);
})
console.log(obj);