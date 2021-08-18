import Scanner from './Scanner'

// 全局提供TALC_TemplateEngine对象
window.TALC_TemplateEngine = {
  // 渲染方法
  render(templateStr, data) {
    /**
     * 实例化一个扫描器，构造函数需要一个参数，这个参数就是模板字符串，这个扫描器专门为模板字符串工作的
     */
    var scanner = new Scanner(templateStr)

    // 测试scanner
    // let words = scanner.scanUtil('{{')
    // console.log(words);
    // console.log(scanner.pos);
    // scanner.scan('{{')
    // console.log(scanner.pos);

    while (!scanner.eos()) {
      var word = scanner.scanUtil('{{')
      console.log(word);
      scanner.scan('{{')
      word = scanner.scanUtil("}}")
      console.log(word);
      scanner.scan('}}')
    }
  }
}

