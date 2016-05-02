/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.code课程列表 的程序逻辑
 */
define(function (require) {
  var mCom = require('mod/common');
  var $ = require('jquery'),
      mDevice = require('device'),
      ResetMenu = require('mod/reset-menu'),
      mBindDropdown = require('mod/dropdown');
  // 页面载入
  $(function() {
    // 实例化 操作的构造函数
    var oResetMenu = new ResetMenu('tab-content');
    // 默认 触发设置 筛选列表 内容盒子对象的高度
    oResetMenu.render();

    // 窗口重置
    var iResizeTimeout = 0;
    $(window).resize(function() {
      if (!mDevice.desktop()) {
        oResetMenu.render();
      }else {
        clearTimeout(iResizeTimeout);
        iResizeTimeout = setTimeout(function() {
          oResetMenu.render();
        },500);
      }
    });

    // 筛选列表 选项按钮绑定 click
    $('#tab-content').on('click', '.menu-filter-bt', function() {
      // 触发设置 筛选列表 内容盒子对象的高度
      oResetMenu.render();
      // $(this).toggleClass('click');
    });

    // 绑定 TAG切换事件。
    $('#menu-tabs').on('click', '.menu-tab', function(event) {
      $(this).tab('show');
      // 触发设置 筛选列表 内容盒子对象的高度
      oResetMenu.render();
    });

    // 购物车下拉事件
    mBindDropdown.init('#sc-btn','.shopping-car',true);
  });
});
