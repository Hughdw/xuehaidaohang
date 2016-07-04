define(function(require) {
  var $ = require('jquery'),
      mAuth = require('components/sign/auth'),
      mSignModal = require('components/sign/sign-modal');
  $(function(){
    var oNavSign = {};
    // 向auth模块中加入导航的登录/登出方法。
    oNavSign.login = function() {
      $('#sign-wrap').addClass('signed');
    };
    oNavSign.logout = function() {
      $('#sign-wrap').removeClass('signed');
    };
    mAuth.addNoticeList(oNavSign);

    // 登录/注册按钮绑定 模态框 事件
    var jqBtn = $('#sign-up,#sign-in');
    mSignModal.bindModal(jqBtn);

    //退出按钮 绑定事件
    $('#logout').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      mAuth.logout();
    });
  });
});
