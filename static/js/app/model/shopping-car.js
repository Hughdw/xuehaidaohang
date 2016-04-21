/**
 * define函数用来定义模块
 * 购物车
 */
define(function (require) {
  var $ = require('jquery');
  return function($ShopingBtn) {
    // 空白处隐藏指定元素
    $(document).on("click",function(event) {
      var target = $(event.target);
      // 隐藏购物车
      if (target.parents(".shopping-car").length == "0") {
        $ShopingBtn.addClass('btn-link');
        $(".btn-group").removeClass('open');
      }
    });
    // 购物车
    $ShopingBtn.on("click",function (event) {
      $(".btn-group").toggleClass("open");
      $(this).toggleClass("btn-link");
      event.stopPropagation();
    });
  };
});
