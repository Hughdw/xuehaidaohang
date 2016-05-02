define(function (require) {
  var com = require("mod/common");
  var $ = require("jquery");
  $(function() {
    var btnTxt = ["取消","设置","绑定","修改","重置"];
    var isEm = [false,true,false,true,true];
    var $avatar = $("#collapse-avatar");
    var $nickname = $("#collapse-nickname");

    // 网站头像相关事件
    $(".operation").on("click",".avatar-link",function (event) {
      // event.stopPropagation();//阻止冒泡会影响browersync工具的多窗口同步，暂时注释
      $avatar.collapse({
        parent:"#accordion"
      });
      $avatar.collapse("toggle");

    });
    $avatar.on("shown.bs.collapse",function() {
      // body...
      $(this).prev().addClass("")
      $("#avatar-edit").text(btnTxt[0]);
    });
    $avatar.on("hidden.bs.collapse",function() {
      // body...
      $("#avatar-edit").text(btnTxt[3]);
    });

    // 用户昵称相关事件
    $(".operation").on("click",".nickname-link",function(event) {
      $nickname.collapse({
        parent:"#accordion"
      });
      $nickname.collapse("toggle");
    });

    // 登录密码相关事件
    $(".operation").on("click",".password-link",function(event) {
      $("#collapse-password").collapse({
        parent:"#accordion"
      });
      $("#collapse-password").collapse("toggle");
    });


  });
});
