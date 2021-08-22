import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

/**
 * 体验diff算法
 */
const container = document.getElementById('container')
const btn = document.getElementById('btn')


// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

var vnode1 = h('ul', {}, [
  h('li', {key: 'A'}, 'A'),
  h('li', {key: 'B'}, 'B'),
  h('li', {key: 'C'}, 'C'),
  h('li', {key: 'D'}, 'D'),
  h('li', {key: 'E'}, 'E')
])

// 上树
patch(container, vnode1)

var vnode2 = h('ul', {}, [
  h('li', {key: "G"}, '头部添加'),
  h('li', {key: "A"}, 'A'),
  h('li', {key: "B"}, 'B'),
  h('li', {key: "C"}, 'C'),
  h('li', {key: "D"}, 'D'),
  h('li', {key: "E"}, 'E'),
  h('li', {key: "F"}, 'F'),
])

btn.addEventListener('click', function () {
  /**
   * 验证：点击按钮前，通过开发者工具，修改vnode1的文本属性，再点击按钮，发现，vnode1部分没有重新渲染，
   * 而是改动了该改动的地方
   */
  patch(vnode1, vnode2)
})

