/**
 * Scanner类，扫描器类
 */
export default class Scanner {
  constructor(templateStr) {
    // console.log(templateStr);
    // 将模板字符串定义成实例的属性
    this.templateStr = templateStr

    // 扫描指针
    this.pos = 0;

    // 尾巴，初始值就是模板字符串的原文
    this.tail = templateStr
  }

  /**
   * 驱动指针进行扫描，直到遇到指定内容结束，并且能够返回结束之前扫描过的内容
   * @param {*} endTag 指针结束的标记
   */
  scanUtil(stopTag) {
    // 记录一下执行本方法时pos的位置，以便截取当前执行时扫描的内容
    const pos_backup = this.pos
    // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
    while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
      this.pos++;
      // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
      this.tail = this.templateStr.substr(this.pos)
    }

    // 将当前扫描的内容返回，左闭右开
    return this.templateStr.substring(pos_backup, this.pos)
  }

  /**
   * 走过指定的内容，没有返回值
   * @param {*} tag 要跳过的内容
   */
  scan(tag) {
    // 首先判断尾巴是不是的第一位是不是要跳过的tag
    if(this.tail.indexOf(tag) == 0){
      // tag有多长，就让指针后移几位
      this.pos += tag.length
      // 指针发生变化，尾巴也要更新
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  /**
   * 判断指针是否已经到模板字符串的末尾了
   * 返回布尔值
   */
  eos(){
    return this.pos >= this.templateStr.length
  }
}