import vnode from "./vnode"
import createElement from "./createElement";
import patchVnode from "./patchVnode";

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
    patchVnode(oldVnode, newVnode)

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
