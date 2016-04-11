/**
 * requirejs函数用来配置以及加载模块
 * 首先加载配置文件
 * 配置文件加在完毕后，指定页面需要引用的第三方库 和 项目模块
 */
requirejs(['static/js/config.js'], function(common) {
  requirejs(['jquery', 'bootstrap', 'app/button'], function($, bs, b) {
    // 构造一个根据屏幕变化时 对 筛选列表 的高度进行控制
    function MenuContHeight(tabContent) {
      this.aTabCont = tabContent;
    }
    MenuContHeight.prototype.render = function() {
      var oHeight = this._init();
      this._addScroll(oHeight.sh, oHeight.th);
    };
    // 初始化当前屏幕的高度和操作对象的高度
    MenuContHeight.prototype._init = function() {
      var iScreenH = window.innerHeight;
      var iTabContH = this.aTabCont.offsetHeight;
      return {
        sh: iScreenH,
        th: iTabContH
      };
    };
    // 通过对当前 文档高度 和 操作对象 的高度判断，决定是否更改对象的高度
    MenuContHeight.prototype._addScroll = function(sh, th) {
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
    $(function() {
      // 获取筛选列表 内容盒子对象
      var oTabContent = document.getElementById("tab-content");
      // 实例化 操作的构造函数
      var m = new MenuContHeight(oTabContent);
      // 页面载入完毕
      m.render();
      // 窗口重置时
      $(window).resize(function() {
        m.render();
      });
      // 筛选列表 选项按钮触发click时，重新设置筛选列表内容盒子的高度
      $("#tab-content").on("click", ".menu-filter-bt", function() {
        m.render();
        // $(this).toggleClass("click");
      });
      // 绑定 TAG切换事件。同时，每次触发重新设置筛选列表 内容盒子对象 的高度
      $("#menu-tabs").on("click", ".menu-tab", function(e) {
        e.preventDefault();
        $(this).tab('show');
        m.render();
      });

      var system ={
          win : false,
          mac : false,
          xll : false
      };
      //检测平台
      var p = navigator.platform;
      system.win = p.indexOf("Win") === 0;
      system.mac = p.indexOf("iP") === 0;
      system.xll = (p == "X11") || (p.indexOf("Linux") === 0);

      // var temp = navigator.platform;
      // document.write(p.indexOf("iP"));
      //
    });
  });
});
