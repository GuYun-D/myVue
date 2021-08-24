import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

const vnode1 = h('section', {}, [
  h('p', {}, 'A'),
  h('p', {}, 'B'),
  h('p', {}, 'C'),
  h('p', {}, 'D'),
  h('p', {}, 'E')
])

const vnode2 = h('section', {}, [
  h('p', {}, '我是新创建的h1'),
  h('p', {}, '我是新创建的h2')
])

// var vnode1 = h('mark', {}, '哈哈哈哈哈哈哈哈哈')

patch(container, vnode1)

btn.addEventListener('click', function(){
  patch(vnode1, vnode2)
})