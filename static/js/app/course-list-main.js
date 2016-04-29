/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.code课程列表 的程序逻辑
 */
define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery"),
      ResetMenu = require("mod/reset-menu"),
      bindDropdown = require("mod/dropdown");
  // 页面载入
  $(function() {
    // 实例化 操作的构造函数
    var oResetMenu = new ResetMenu(document.getElementById("tab-content"));
    // 默认 触发设置 筛选列表 内容盒子对象的高度
    oResetMenu.render();

    // 窗口重置
    var currentTime = 0,countDownTime = 0,doTime = 0;
    // var int =
    function countDown(ct) {
      countDownTime = ct+100;
      if (countDownTime > doTime) {
        // 触发设置 筛选列表 内容盒子对象的高度
        oResetMenu.render();
      }
    }

    $(window).resize(function() {
      // 第一次获取当前时间，后续储存上次
      currentTime =  new Date().getTime();
      doTime = currentTime + 1000;
      self.setInterval("countDown(currentTime)",100);

      // 调整窗口时，第一次触发进行一个倒计时。
      // 倒计时间隔以 200毫秒计算。
      // 调整窗口时，第二次触发在前一个触发倒计时还没结束时触发，则重新进行倒计时。

    });

    // 筛选列表 选项按钮绑定 click
    $("#tab-content").on("click", ".menu-filter-bt", function() {
      // 触发设置 筛选列表 内容盒子对象的高度
      oResetMenu.render();
      // $(this).toggleClass("click");
    });

    // 绑定 TAG切换事件。
    $("#menu-tabs").on("click", ".menu-tab", function(event) {
      event.preventDefault();//阻止默认事件行为的触发
      $(this).tab("show");
      // 触发设置 筛选列表 内容盒子对象的高度
      oResetMenu.render();
    });

    // 购物车下拉事件
    bindDropdown.init("#sc-btn",".shopping-car",true);
  });
});
