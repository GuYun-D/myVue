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
    if (word != '') {
      /**
       * 去除word中的空格，使字符串更美观
       * 标签内部的空格不能去掉
       * <div class="aaa"></div>
       */
      // 定义一个flag，默认认为这个空格不在标签内部
      let isInTag = false
      // 空白字符串
      let _word = ''
      for (let i = 0; i < word.length; i++) {
        // 判断空格是否在标签中
        if (word[i] == '<') {
          isInTag = true
        } else if (word[i] == '>') {
          isInTag = false
        }

        // 如果这项不是空格，直接拼接上
        if(!/\s/.test(word[i])){
          _word += word[i]
        }else {
          // 如果这项是空格，只有当它在标签内部的时候才拼接上
          if(isInTag){
            _word += ' '
          }
        }
      }

      tokens.push(['text', _word])
    }
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

  // console.log(tokens);
  // 上述操作将模板转换成了一维的tokens，后续需要将它转换成二维的
  return nestTokens(tokens)
}