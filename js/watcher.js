

class Watcher{
  constructor(vm, exp, cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
  }
  update() {
    var value = this._getVal(this.exp);
    var oldVal = this.value;
    if (value !== oldVal) {
        this.value = value;
        this.cb.call(this.vm, value, oldVal);
    }
  }
  get() {
      //这个纯粹是为了添加到 
      Dep.target = this;  // 缓存自己
      var value = this._getVal(this.exp)  // 强制执行监听器里的get函数
      Dep.target = null;  // 释放自己
      return value;
  }
  _getVal(exp) {
    return exp.split('.').reduce((acc,cur)=>acc[cur] ,this.vm.$data)
  }
}


