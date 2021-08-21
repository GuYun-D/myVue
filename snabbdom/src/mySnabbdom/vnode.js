/** 
 * {
 *    children: undefined,  // 子元素
 *    data: {},  // 属性，样式
 *    elm: undefined,  // 这个元素对应的真正的DOM节点，如果undefined说明这个节点还没有上树
 *    key: undefined,  // 服务于最小更新
 *    sel: "div",  // 选择器
 *    text: "我是一个盒子"  // 
 * }
 * @returns 返回一个上述对象
 */
export default function (sel, data, children, text, elm) {

  return {
    sel, data, children, text, elm
  }
}