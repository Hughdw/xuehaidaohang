define(function (require) {
  var $ = require('jquery'),
      tpldata = require('tpldata'),
      render = require('tpl/personal/purchase-main'),
      replaceImgPath = require('mod/replace-img-path');
  $(function() {
    tpldata.sidebar.activeMenu = 3;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    document.getElementById('main').innerHTML = render(tpldata);
    // document.getElementById('main').innerHTML = template('personal/purchase-main',tpldata);
    replaceImgPath();
    // 开启工具提示
    $("[data-toggle='tooltip']").tooltip();
    // 点击按钮添加新获取到的内容
    $('.load-box').on('click', '#loadBtn', function(event) {
      event.preventDefault();
      /* Act on the event */
      var render = template('personal/purchase-content');
      var html = render(tpldata.purchase);
      $('#purchase-content').append(html);
      // 开启工具提示
      $("[data-toggle='tooltip']").tooltip();
    });
  });
});