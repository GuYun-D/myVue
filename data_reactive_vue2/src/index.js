import { observe } from "./observe"

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

obj.c.push("4", "23", "21")

console.log(obj.c);