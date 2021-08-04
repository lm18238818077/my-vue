function Mvue(options) {
  this.$options = options;
  this.$data = options.data;
  Object.keys(this.$data).forEach((key) => {
    this.proxyData(key);
  });

  this.init();
}

Mvue.prototype = {
  init: function () {
    observe(this.$data);
    this.$compile = new Compile(this.$options.el || document.body, this);
  },
  proxyData: function (key) {
    Object.defineProperty(this, key, {
      get: function () {
        return this.$data[key];
      },
      set: function (value) {
        this.$data[key] = value;
      },
    });
  },
};

// 原理
//vue采用数据劫持，配合发布订阅模式，通过object.definerproper来劫持各个属性的setter，getter，在数据变动时通知消息订阅器，去通知观察者，触发对应的回调函数，来更新视图

//mvvm作为绑定的入口，整合observer，complier，和watcher三者，通过observer来监听modal数据变化，通过complier来解析编译指令，最总利用watcher搭起observer，comlier之间的通信桥梁，达到数据变化-》视图更新，视图交互变化-》数据modal变更的双向绑定效果。
