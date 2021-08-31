export default class Dep {
  constructor() {
    console.log("我是DEP的构造器");
  }

  notify(){
    console.log("我是notify");
  }
}