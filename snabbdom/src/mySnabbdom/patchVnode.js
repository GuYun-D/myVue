import createElement from "./createElement";
import updataChildren from './updataChildren'

/**
 * 处理当新旧节点属于同一个虚拟dom时的操作
 *  @param {*} oldVnode 旧的节点
 *  @param {*} newVnode 新的节点
 */
export default function patchVnode(oldVnode, newVnode) {
  // 创建一个un，指向新节点
  let un = 0
  // 判断新旧虚拟节点是否是同一个节点
  if (!(newVnode === oldVnode)) {
    // 判断newVnode有没有text属性
    if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
      console.log("命中");
      if (oldVnode.text !== newVnode.text) {
        // 如果新的虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入到老的elm之间。如果老的elm是children，那么也会立刻消失
        oldVnode.elm.innerText = newVnode.text
      }
    } else {
      // 新节点没有text属性，有children属性
      console.log("新节点没有text属性");
      if (oldVnode.children != undefined && oldVnode.children.length > 0) {
        // 老的节点有children，此时是最复杂的情况，即：新老节点都有children属性
        // 因为新老节点属于同一个虚拟节点，所以参数父节点都一样，可以实oldVnode.elm,也可以是newVnode.elm
        updataChildren(oldVnode.elm, oldVnode.children, newVnode.children)
      } else {
        // 老的没有children，新的有chuildren
        // 清空老的节点内容
        oldVnode.elm.innerText = ''
        for (let i = 0; i < newVnode.children.length; i++) {
          let dom = createElement(newVnode.children[i])
          oldVnode.appendchild(dom)
        }
      }
    }
  }
}