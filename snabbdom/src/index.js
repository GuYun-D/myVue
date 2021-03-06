import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

const vnode1 = h('ul', {},
  [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E')
  ]
)

const vnode2 = h('ul', {}, [
  h('li', { key: "M" }, "M"),
  h('li', { key: 'C' }, 'C'),
  h('li', { key: 'Q' }, 'Q'),
  h('li', { key: 'B' }, h('a', { props: { href: "http://www.baidu.com" } }, "百度"))
])

// beforebug测试
const vnode3 = h('ul', {},
  [
    h('li', { key: 'Q' }, 'Q'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E')
  ]
)

// var vnode1 = h('mark', {}, '哈哈哈哈哈哈哈哈哈')

patch(container, vnode1)

btn.addEventListener('click', function () {
  patch(vnode1, vnode3)
})