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
