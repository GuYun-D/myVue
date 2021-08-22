import vnode from "./vnode"
import createElement from "./createElement";
/**
 * 虚拟dom上树
 *  @param {*} oldVnode 旧的节点
 *  @param {*} newVnode 新的节点
 */
export default function (oldVnode, newVnode) {
  /**
   * 先判断旧的节点是虚拟dom还是真实dom:是否含有sel属性
   */
  if (oldVnode.sel = '' || oldVnode.sel == undefined) {
    // 真实的dom，包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }

  /**
   * 判断oldVnode, newVnode是不是同一个节点
   */
  if(oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel){
    // 是同一个节点
    console.log("同一个节点");
  }else {
    // 不是同一个，暴力删除旧的，添加新的
    console.log("不是同一个，暴力删除旧的，添加新的");
    // 此时的oldVnode肯定是一个虚拟节点
    createElement(newVnode, oldVnode.elm)
  }

}
