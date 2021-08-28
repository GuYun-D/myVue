import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

const vnode1 = h('ul', {},
  [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D')
  ]
)

const vnode2 = h('ul', {}, [
  h('li', { key: 'A' }, [
    h('p', {}, "gaga"),
    h('p', {}, "aa"),
    h('p', {}, "gaaaaga")
  ]),
  h('li', { key: 'B' }, 'B'),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'D' }, 'D')
])

// var vnode1 = h('mark', {}, '哈哈哈哈哈哈哈哈哈')

patch(container, vnode1)

btn.addEventListener('click', function () {
  patch(vnode1, vnode2)
})