define(function (require) {
  var com = require('mod/common');
  var $ = require('jquery'),
      shoppingBtn = require('mod/shopping-car');
  $(function() {
    // 购物车下拉事件
    shoppingBtn($("#sc-btn"));
  });
});
