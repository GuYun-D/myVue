var obj = {}

/**
 * 参数一：定义哪一个对象
 * 参数二：要定义的属性
 * 参数三：该属性的操作符
 */
// 创建一个中转变量
var temp;

Object.defineProperty(obj, 'a', {
  get(){
    return temp
  },

  set(newVal){
    temp = newVal
    return temp
  }
})

Object.defineProperty(obj, 'b', {
  value: 5
})

obj.a = 1
console.log(obj.a);