import vnode from "./vnode"
import createElement from "./createElement";
/**
 * 虚拟dom上树
 *  @param {*} oldVnode 旧的节点
 *  @param {*} newVnode 新的节点
 */
export default function patch(oldVnode, newVnode) {
  /**
   * 先判断旧的节点是虚拟dom还是真实dom:是否含有sel属性
   */
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // 真实的dom，包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  /**
   * 判断oldVnode, newVnode是不是同一个节点
   */
  if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
    // 是同一个节点
    console.log("同一个节点");

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

  } else {
    // 不是同一个，暴力删除旧的，添加新的
    console.log("不是同一个，暴力删除旧的，添加新的");
    //将 这个虚拟dom创建成真正的dom
    let newVnodeElm = createElement(newVnode)
    // console.log(newVnodeElm); ->  <mark>哈哈哈哈哈哈哈哈哈</mark>
    // console.log(newVnodeElm);

    if (oldVnode.elm.parentNode && newVnodeElm) {
      // 插入到老节点之前
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }

    // 插入成功，删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)

  }

}
