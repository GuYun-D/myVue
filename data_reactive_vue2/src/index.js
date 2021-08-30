var obj = {}
/**
 * 参数一：定义哪一个对象
 * 参数二：要定义的属性
 * 参数三：该属性的操作符
 */
// 创建一个中转变量
// var temp;

// Object.defineProperty(obj, 'a', {
//   get(){
//     return temp
//   },

//   set(newVal){
//     temp = newVal
//     return temp
//   }
// })

// Object.defineProperty(obj, 'b', {
//   value: 5
// })

// obj.a = 1
// console.log(obj.a);

/**
 * 封装dfineReactive函数
 * 构造了一个闭包环境
 */

function defineReactive(data, key, val) {
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
    }
  })
}

defineReactive(obj, "a", 10)

console.log(obj.a);

obj.a = 12
console.log(obj.a);