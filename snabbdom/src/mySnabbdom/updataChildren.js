import patchVnode from "./patchVnode";

/**
 * 
 * @param {*} parentNode 父节点
 * @param {*} oldCh 老的子元素
 * @param {*} newCh 新的子元素
 */
export default function updataChildren(parentNode, oldCh, newCh) {
  // console.log(parentNode);
  // console.log(oldCh);
  // console.log(newCh);

  /**
   * 定义指针
   */
  // 旧前
  let oldStartIdx = 0
  // 新前
  let newStartIdx = 0
  // 旧后
  let oldEndIdx = oldCh.length - 1
  // 新后
  let newEndIdx = newCh.length - 1

  // 旧前节点
  let oldStartVnode = oldCh[0]
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新前节点
  let newStartVnode = newCh[0]
  // 新后节点
  let newEndVnode = newCh[newEndIdx]

  // 开始循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 处理新前和旧前
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = oldCh[++newStartIdx]
    }
  }
}

/**
 * 判断是否是同一个节点
 * @param {*} a 要比较的两个节点
 * @param {*} b 要比较的两个节点
 * @returns 布尔值
 */
function checkSameVnode(a, b) {
  return a.sel === b.sel && a.key === b.key;
}
