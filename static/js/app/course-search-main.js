define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery");
  $(function() {
    $("#loadBtn").on("click", function(event) {
      // event.preventDefault();
      /* Act on the event */
      var $btn = $(this).button("loading");
      // business logic...
      // $btn.button("reset");//恢复按钮初始状态
    });
  });
});
