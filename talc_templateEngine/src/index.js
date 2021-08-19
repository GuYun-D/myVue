// import Scanner from './Scanner'
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTempalte from './renderTempalte'

// 全局提供TALC_TemplateEngine对象
window.TALC_TemplateEngine = {
  // 渲染方法
  render(templateStr, data) {
    var tokens = parseTemplateToTokens(templateStr)
    // console.log(tokens);
    /**
     *  单元测试Scanner
     *  实例化一个扫描器，构造函数需要一个参数，这个参数就是模板字符串，这个扫描器专门为模板字符串工作的
     *  var scanner = new Scanner(templateStr)
     *  var word;
     *  测试scanner1
     *  let words = scanner.scanUtil('{{')
     *  console.log(words);
     *  console.log(scanner.pos);
     *  scanner.scan('{{')
     *  console.log(scanner.pos)
     *
     *  测试scanner2
     *  while (!scanner.eos()) {
     *    word = scanner.scanUtil('{{')
     *    console.log(word);
     *    scanner.scan('{{')
     *    word = scanner.scanUtil("}}")
     *    console.log(word);
     *    scanner.scan('}}')
     *   }
     */

    // 调用renderTemplate函数，让tokens数组转化成dom字符串
    let domStr = renderTempalte(tokens, data)
    console.log(domStr);
  }
}