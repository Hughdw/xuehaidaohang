define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery");
  $(function() {

    $(".operation").on("click",".avatar-btn",function (event) {
      // event.stopPropagation();//阻止冒泡会影响browersync工具的多窗口同步，暂时注释

      $("#collapse-avatar").collapse({
        parent:"#accordion"
      });
      $("#collapse-avatar").collapse("toggle");
    });

    $(".operation").on("click",".nickname-btn",function(event) {
      $("#collapse-nickname").collapse({
        parent:"#accordion"
      });
      $("#collapse-nickname").collapse("toggle");
    });
  });
});
