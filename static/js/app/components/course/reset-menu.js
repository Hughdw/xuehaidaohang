/**
 * define函数用来定义模块
 * 重置course-list.html 中 Menu尺寸的模块
 */
define(function (require) {
  var resizeMenu = {};
  var eTabCont;
  resizeMenu.render = function(tabContent) {
    eTabCont = document.getElementById(tabContent);
    resizeMenu._reset();
    resizeMenu._binEve();
  };
  // 初始化当前屏幕的高度和操作对象的高度
  resizeMenu._init = function() {
    var iScreenH = window.innerHeight;
    var iTabContH = eTabCont.offsetHeight;
    return {
      screenH: iScreenH,
      tabContH: iTabContH
    };
  };
  // 通过对当前 文档高度 和 操作对象 的高度判断，决定是否更改对象的高度
  resizeMenu._reset = function() {
    var oHeight = resizeMenu._init();
    var sh = oHeight.screenH;
    var th = oHeight.tabContH;
    // 内容高度是通过 文档高度 减去 nav高度 和 menu tab高度 算出来的
    var iMenuHeight = 30; //筛选列表TAG高度
    var iNavHeight = 50; //导航高度
    var iSetHeight = (sh - iMenuHeight - iNavHeight);
    if (iSetHeight <= th) {
      eTabCont.style.height = iSetHeight - 5 + 'px';
    } else {
      eTabCont.style.height = 'auto';
    }
  };
  // 绑定需要触发重置menu高度的事件
  resizeMenu._binEve = function() {
    var iTimer = 0;
    // 窗口发生变化时候，重置高度
    $(window).resize(function() {
      if (mGlobal.isPC) {
        clearTimeout(iTimer);
        iTimer = setTimeout(function() {
          resizeMenu._reset();
        },500);
      }else {
        resizeMenu._reset();
      }
    });
    // 点击按钮时，重置高度
    $('#tab-content').on('click', '.menu-filter-bt', function() {
      resizeMenu._reset();
    });
    // 切换TAB时，重置高度
    $('#menu-tabs').on('click', '.menu-tab', function(event) {
      resizeMenu._reset();
    });

  };
  return resizeMenu.render;
});
