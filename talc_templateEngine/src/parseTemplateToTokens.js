import Scanner from "./Scanner";
import nestTokens from './nestTokens'


/**
 * 将模板字符串转换成tokens
 * @param {*} templateStr 模板字符串
 * @returns tokens
 */
export default function parseTemplateToTokens(templateStr) {
  const tokens = []

  // 创建扫描器
  var scanner = new Scanner(templateStr)
  var word = ''

  // 扫描器开始工作
  while (!scanner.eos()) {
    word = scanner.scanUtil("{{")
    word && tokens.push(['text', word])
    scanner.scan('{{')
    word = scanner.scanUtil("}}")
    if (word != '') {
      /**
       * 如果出现循环，类型就是#
       */
      if (word[0] === '#') {
        tokens.push(['#', word.substring(1)])
      } else if (word[0] === '/') {
        tokens.push(['/', word.substring(1)])
      } else {
        tokens.push(['name', word])
      }

    }
    scanner.scan("}}")
  }

  // 上述操作将模板转换成了一维的tokens，后续需要将它转换成二维的
  return nestTokens(tokens)
}