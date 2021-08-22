/**
 * 真正的创建节点
 * 将虚拟节点vnode创建成真正的DOM，插入到标杆pivot这个元素之前
 * @param {*} vnode 虚拟节点
 * @param {*} pivot 标杆，
 */
export default function (vnode, pivot) {
  console.log("目标就是把虚拟节点：", vnode, "插入到标杆", pivot, "前面");

  // 创建了一个真实的孤儿dom节点
  let domNode = document.createElement(vnode.sel)

  // 有子节点还是文本节点，简单版，不允许文本和标签同时出现在直接子元素中
  if (vnode.text != '' || vnode.children == undefined || vnode.children.length === 0) {
    // 说明当前这是一个文本
    domNode.innerText = vnode.text

    //孤儿上树 ，让标杆节点的父元素调用insertBefore方法，将新创建的孤儿节点插入到标杆结点之前
    pivot.parentNode.insertBefore(domNode, pivot)
  }
}