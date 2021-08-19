/**
 * 折叠tokens,对于模板需要循环的进行折叠成二维的
 * 参数：tokens，零散的一维tokens数组
 */
export default function nestTokens(tokens) {
  // 结果数组
  const nestedTokens = []
  // 创建一个栈结构
  const sections = []
  // 创建一个收集器，引用类型值，两个指向的是同一个数组
  let collector = nestedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    switch (token[0]) {
      case "#":
        // 往收集器中放入这个token
        collector.push(token)
        // 入栈
        sections.push(token)
        // 收集器换人
        collector = token[2] = []
        break;
      case "/":
        // 出栈
        let section_pop = sections.pop()
        // 修改收集器为栈结构队尾（队尾是栈顶）那项的下标为2的数组
        collector = sections.length > 0 ? sections[sections.length - 1][2] : nestedTokens
        break;
      default:
        // 不管当前的collector是谁，可能是结果nestedTokens，也可能是某个token的下标为2的数组，不管是谁，推入collector即可
        collector.push(token)
        break;
    }
  }
  return nestedTokens
}