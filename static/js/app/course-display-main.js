define(function (require) {
  var $ = require('jquery'),
      mBindDropdown = require('mod/dropdown');
  $(function() {

    // 绑定 TAG切换事件。
    $('#sidebar-tabs').on('click', '.sidebar-tab', function(event) {
      $(this).tab('show');
    });

    // 标题下拉
    mBindDropdown.init('#tm-btn','.tit-master');
    // 购物车下拉事件
    mBindDropdown.init('#sc-btn','.shopping-car',true);
  });
});
