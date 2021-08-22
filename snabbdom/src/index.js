import h from './mySnabbdom/h'

// 测试
var vnode1 = h("div", {}, [
  h('p', {}, '哈哈'),
  h('p', {}, '呵呵'),
  h('p', {}, '嘻嘻')
])
console.log(vnode1);