import createElement from "./createElement";

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
        for (let i = 0; i < newVnode.children.length; i++) {
          let ch = newVnode.children[i]
          // 对老节点进行遍历，查看老节点是否存在和该节点相同的节点
          // 创建一个flag，标记是否存在相同节点
          let isExist = false
          for (let j = 0; j < oldVnode.children.length; j++) {
            if (oldVnode.children[j].sel === ch.sel && oldVnode.children[j].key === ch.key) {
              isExist = true
            }
          }

          if (!isExist) {
            console.log(ch, i);
            let dom = createElement(ch)
            // 添加elm
            ch.elm = dom
            console.log(dom);
            // 上树
            if (un < oldVnode.children.length) {
              console.log(oldVnode.elm.insertBefore);
              oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
            } else {
              // 如果un的值超过了旧节点，说明还有节点插入在旧节点的末尾，直接append进去
              oldVnode.elm.appendChild(dom)
            }

          } else {
            // 让处理旧节点的指针下移
            un++
          }
        }
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