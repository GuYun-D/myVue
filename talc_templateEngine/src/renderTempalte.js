import lookup from './lookup'
import parseArray from './parseArray'

/**
 * 将tokens字符串转变成dom字符串
 */
export default function renderTempalte(tokens, data) {
  // console.log(tokens);
  // console.log(data);
  // 定义一个结果字符串
  let resultStr = ''
  // 遍历token
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    // console.log(token);
    // 判断类型
    if (token[0] == 'text') {
      resultStr += token[1]
    } else if (token[0] == 'name') {
      // console.log(data);
      // console.log(token[1]);
      resultStr += lookup(data, token[1])
    } else if (token[0] == '#') {
      resultStr += parseArray(token, data)
    }
  }

  return resultStr
}