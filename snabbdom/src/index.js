import h from './mySnabbdom/h'
import patch from './mySnabbdom/patch'

const container = document.getElementById('container')
var vnode1 = h('h1', {}, "你好")

patch(container, vnode1)