/**
 * 运行，将1文件名修改成index
 */

import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([classModule, propsModule, styleModule, eventListenersModule])

// 创建虚拟节点
var vnode1 = h('a', { props: { href: "http://www.baidu.com" } }, '百度')
console.log(vnode1);

var vnode2 = h('div', { class: { 'box': true } }, "我是一个盒子")

var vnode3 = h('ul', {}, [
  h('li', {}, "牛奶"),
  h('li', {}, "咖啡"),
  h('li', {}, "可乐")
])

// 虚拟节点上树
// 一个容器只能上一个虚拟节点
var container = document.getElementById('container')

// patch(container, vnode1)
// patch(container, vnode2)
patch(container, vnode3)