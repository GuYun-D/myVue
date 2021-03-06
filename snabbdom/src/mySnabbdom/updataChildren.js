import patchVnode from "./patchVnode";
import createElement from "./createElement";

/**
 * 
 * @param {Object} parentNode 父节点
 * @param {Array} oldCh 老的子元素
 * @param {Array} newCh 新的子元素
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

  let keyMap = null

  // 开始循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (checkSameVnode(oldStartVnode, newStartVnode)) {
      // 处理新前和旧前
      console.log("命中新前和旧前");
      patchVnode(oldStartVnode, newStartVnode)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
      // 处理新后和旧后
      console.log("命中新后和旧后");
      patchVnode(oldEndVnode, newEndVnode)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]

    } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
      console.log("命中新后与旧前");
      patchVnode(oldStartVnode, newEndVnode)
      // 当3命中的时候，此时要移动节点
      // 移动节点：只要插入一个已经存在DON树上的节点，他就会被移动
      parentNode.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
      console.log("命中新前旧后");
      patchVnode(oldEndVnode, newStartVnode)
      // 当3命中的时候，此时要移动节点
      parentNode.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 四种命中规则都没有命中
      console.log("四种都没有命中");

      // 将老节点做一个map映射
      if (!keyMap) {
        keyMap = {};
        // 记录oldVnode中的节点出现的key
        // 从oldStartIdx开始到oldEndIdx结束，创建keyMap
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      console.log(keyMap);

      // 接着寻找为命中的那一项（newSartIdx）在map映射中的位置
      let idxInOld = keyMap[newStartVnode.key]
      console.log(idxInOld);

      // 找到之后对idxInOld进行判断，undefined就是当前项并不存在于老节点，就是新的项，直接插入即可
      // 如不是undefined，就是需要移动该项的位置
      if (idxInOld == undefined) {
        // 直接添加新的项, undefined就是当前项并不存在于老节点，就是新的项，直接插入即可
        // 被添加的新的项，现在还是虚拟dom，不是真正的dom
        console.log("@");
        parentNode.insertBefore(createElement(newStartVnode), oldStartVnode.elm)

      } else {
        // 移动项
        // 取出要移动的项
        const elmToRemove = oldCh[idxInOld]
        console.log(elmToRemove);

        // 判断elmToRemove存在
        patchVnode(elmToRemove, newStartVnode)
        // 打标记, 处理过的打上undefined
        oldCh[idxInOld] = undefined
        // 移动
        parentNode.insertBefore(elmToRemove.elm, oldStartVnode.elm)

      }

      // 判断
      newStartVnode = newCh[++newStartIdx]
    }
  }

  // while执行完毕，还存在旧前超了旧后的情况，就是“新增的情况.png”,就看看有没有剩余的节点没有处理
  if (newStartIdx <= newEndIdx) {
    console.log("循环结束了，但是新节点还存在");
    // 循环结束了，但是newStartIdx还没有移到newEndIdx之后的话，说明新的节点就是还有没有遍历到的子节点，要插入进去
    // 遍历新的newCH，添加到老的没有处理的之前，这里的before出bug
    // let before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm

    // console.log(before); // null,方法会自动识别，如果是null就是自动排到队尾去

    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // newCh[i]仍然是虚拟节点
      parentNode.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log("老节点还有节点没有处理");
    // 批量删除oldStart和oldEnd指针之间的项
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentNode.removeChild(oldCh[i].elm)
      }
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



