define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery");
  $(function() {
    function tmpFn() {
      $("#collapse-avatar").collapse("toggle");
    }
    // setInterval(tmpFn,4000);
    // $(".operation").on("click",".collapse-btn",function (event) {
    //   // event.stopPropagation();//阻止冒泡会影响browersync工具的多窗口同步，暂时注释
    //   $("#collapse-avatar").collapse("toggle");
    // });

    // $(".setting").on("click",function(event) {
    //   $("#collapse-avatar").collapse("toggle");
    // })
  });
});
