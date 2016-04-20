/**
 * requirejs函数用来配置以及加载模块
 * 首先加载配置文件
 * 配置文件加在完毕后，指定页面需要引用的第三方库 和 项目模块
 */
requirejs(['static/js/config.js'], function(config) {
  requirejs(['jquery', 'bootstrap', 'app/common'], function($, bs, common) {
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

    // 页面载入
    $(function() {
      // 实例化 操作的构造函数
      var oMenuContHeight = new MenuContHeight(document.getElementById("tab-content"));
      var oShopingBtn = $("#sc-btn");
      // 默认 触发设置 筛选列表 内容盒子对象的高度
      oMenuContHeight.render();
      // 窗口重置
      $(window).resize(function() {
        // 触发设置 筛选列表 内容盒子对象的高度
        oMenuContHeight.render();
      });
      // 筛选列表 选项按钮绑定 click
      $("#tab-content").on("click", ".menu-filter-bt", function() {
        // 触发设置 筛选列表 内容盒子对象的高度
        oMenuContHeight.render();
        // $(this).toggleClass("click");
      });
      // 绑定 TAG切换事件。
      $("#menu-tabs").on("click", ".menu-tab", function(event) {
        event.preventDefault();//阻止默认事件行为的触发
        $(this).tab("show");
        // 触发设置 筛选列表 内容盒子对象的高度
        oMenuContHeight.render();
      });
      // 空白处隐藏指定元素
      $(document).on("click",function(event) {
        var target = $(event.target);
        // 隐藏购物车
        if (target.parents(".shopping-car").length == "0") {
          oShopingBtn.addClass('btn-link');
          $(".btn-group").removeClass('open');
        }
      });
      // 购物车
      oShopingBtn.on("click",function (event) {
        $(".btn-group").toggleClass("open");
        $(this).toggleClass("btn-link");
        event.stopPropagation();
      });
    });
  });
});
