define(function(require) {
  var $ = require('jquery'),
      mAuth = require('./sign/auth'),
      mSignModal = require('./sign/sign-modal');
  $(function(){
    var nav = {};
    nav.login = function() {
      $('#sign-wrap').addClass('signed');
    };
    nav.logout = function() {
      $('#sign-wrap').removeClass('signed');
    };
    mAuth.addNoticeList(nav);

    // 登录/注册按钮绑定 模态框 事件
    var jqBtn = $('#sign-up,#sign-in');
    mSignModal(jqBtn);

    //退出事件
    $('#logout').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      mAuth.logout();
    });
  });
});
