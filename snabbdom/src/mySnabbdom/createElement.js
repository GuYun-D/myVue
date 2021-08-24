/**
 * 真正的创建节点
 * 将虚拟节点vnode创建成真正的DOM，孤儿节点，不进行插入，在patch函数中插入
 * @param {*} vnode 虚拟节点
 * 将标杆拿出去了,因为当第三个参数是数组的时候，里面包含了其他的h函数，从上到下开始创建，就没有标杆
 */
export default function createElement(vnode) {
  // 创建了一个真实的孤儿dom节点
  let domNode = document.createElement(vnode.sel)

  // 有子节点还是文本节点，简单版，不允许文本和标签同时出现在直接子元素中
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length === 0)) {
    // 说明当前这是一个文本
    // 这样就是相当于是让文字上树
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    /**
     * 数组形式
     * 它内部是子节点，所以就要递归创建子节点
     */
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i]
      // console.log(ch);
      // 创建出DOM，一旦调用createElement函数就意味着：创建出了dom，并且它的elm属性指向了创建出的DOM，但是还没有上树，一个孤儿节点
      let chDom = createElement(ch)
      // 上树
      domNode.appendChild(chDom)
    }

  }else {
    console.log("你都没有执行");
  }
  // 补充elm属性
  vnode.elm = domNode

  // 返回elm,elm是一个纯dom节点
  return vnode.elm
}