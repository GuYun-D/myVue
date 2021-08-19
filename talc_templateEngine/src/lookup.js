/**
 * 寻找连续点的形式的属性的值,如nameList.nameObj.id
 */
export default function lookup(dataObj, keyName) {
  // 奶奶的
  keyName = keyName.trim()

  /**
   * 先对keyName进行判断，如果含有点，就进行分割，如果没有就直接赋值;
   * 但是keyName又不能是一个'.'
   */
  if (keyName.indexOf('.') != -1 && keyName !== '.') {
    var keys = keyName.split('.')
    var temp = dataObj
    for (let i = 0; i < keys.length; i++) {
      temp = temp[keys[i]];
    }
    return temp
  }
  // 没有嵌套，直接赋值
  return dataObj[keyName]

}