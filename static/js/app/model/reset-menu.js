/**
 * define函数用来定义模块
 * 重置Menu尺寸的构造函数
 */
define(function (require) {
  // 构造一个根据屏幕变化时 对 筛选列表 的高度进行控制的函数
  function ResetMenuSize(tabContent) {// 传入一个DOM对象
    this.aTabCont = tabContent;
  }
  ResetMenuSize.prototype.render = function() {
    var oHeight = this._init();
    this._addScroll(oHeight.sh, oHeight.th);
  };
  // 初始化当前屏幕的高度和操作对象的高度
  ResetMenuSize.prototype._init = function() {
    var iScreenH = window.innerHeight;
    var iTabContH = this.aTabCont.offsetHeight;
    return {
      sh: iScreenH,
      th: iTabContH
    };
  };
  // 通过对当前 文档高度 和 操作对象 的高度判断，决定是否更改对象的高度
  ResetMenuSize.prototype._addScroll = function(sh, th) {
    // 内容高度是通过 文档高度 减去 nav高度 和 menu tab高度 算出来的
    var iMenuHeight = 30; //筛选列表TAG高度
    var iNavHeight = 50; //导航高度
    var setHeight = (sh - iMenuHeight - iNavHeight);
    if (setHeight <= th) {
      this.aTabCont.style.height = setHeight - 5 + "px";
    } else {
      this.aTabCont.style.height = "auto";
    }
  };
  return ResetMenuSize;
});
