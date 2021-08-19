import lookup from "./lookup"
import renderTempalte from "./renderTempalte"

/**
 * 处理数组的循环，结合renderTemplate实现递归
 * 这个函数要递归调用，调用次数由data决定
 * var data = {
 *   arr: [
 *     { name: "小明", age: 8, sex: "男" },
 *     { name: "小花", age: 11, sex: "男" },
 *     { name: "小秀", age: 10, sex: "女" }
 *   ]
 * }
 * 对于上面的数据，renderTemplate就要调用三次，因为数据长度为3
 * @param {Array} token  数组的tokens，如["#", arr, []]
 */
export default function parseArray(token, data) {
  // console.log(token);
  // console.log(data);
  /**
   * 此函数的作用就是获取循环数组的数据，所以usefulData就是当前数组的数据
   */
  var usefulData = lookup(data, token[1])
  // console.log(usefulData);

  // 结果字符串
  let resultStr = ''
  // 遍历
  for (let i = 0; i < usefulData.length; i++) {
    // console.log(token[2]);
    // console.log(usefulData[i]);
    resultStr += renderTempalte(token[2], usefulData[i])
  }
  return resultStr
}