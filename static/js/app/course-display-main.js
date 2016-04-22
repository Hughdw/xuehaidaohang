define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery"),
      bindDropdown = require("mod/dropdown");
  $(function() {

    // 绑定 TAG切换事件。
    $("#sidebar-tabs").on("click", ".sidebar-tab", function(event) {
      event.preventDefault();//阻止默认事件行为的触发
      $(this).tab("show");
    });

    // 标题下拉
    bindDropdown.init("#tm-btn",".tit-master");
    // 购物车下拉事件
    bindDropdown.init("#sc-btn",".shopping-car",true);
  });
});
