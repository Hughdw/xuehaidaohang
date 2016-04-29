define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery");
  $(function() {
    $(".edit").on("click",function (event) {
      $("#collapse-avatar").collapse("toggle");
    });
    $(".setting").on("click",function(event) {
      $("#collapse-avatar").collapse("toggle");
    })
  });
});
