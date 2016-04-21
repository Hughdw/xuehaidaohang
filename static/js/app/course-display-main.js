define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery"),
      bindDropdown = require("mod/dropdown");
  $(function() {


    
    // 标题下拉
    bindDropdown.init("#tm-btn",".tit-master");
    // 购物车下拉事件
    bindDropdown.init("#sc-btn",".shopping-car",true);
  });
});
