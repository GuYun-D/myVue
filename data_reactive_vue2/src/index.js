import { observe } from "./observe"

var obj = {
  a: {
    m: {
      n: 112
    }
  },
  b: 10
}

observe(obj)

obj.a.m.n = 12
console.log(obj.a.m.n);