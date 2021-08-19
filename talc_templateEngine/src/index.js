// import Scanner from './Scanner'
import parseTemplateToTokens from './parseTemplateToTokens'
import renderTempalte from './renderTempalte'

// 全局提供TALC_TemplateEngine对象
window.TALC_TemplateEngine = {
  // 渲染方法
  render(templateStr, data) {
    var tokens = parseTemplateToTokens(templateStr)

    // 调用renderTemplate函数，让tokens数组转化成dom字符串
    let domStr = renderTempalte(tokens, data)
    // console.log(domStr);
    console.log(domStr);
  }
}