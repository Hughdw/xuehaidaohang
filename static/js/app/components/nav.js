/**
 * 共用模块
 * 导航部分
 */
define(function (require) {
  var $ = require('jquery');
  var mSearch = require('components/course/search');
  var mAuth = require('components/sign/auth');
  var mSignModal = require('components/sign/sign-modal');
  $(function () {
    // 向auth模块中加入导航的登录/登出方法。
    mAuth.addNoticeList(
      function () {
        $('#sign-wrap').addClass('signed');
      },
      function () {
        $('#sign-wrap').removeClass('signed');
      }
    );

    // 登录/注册按钮绑定 模态框 事件
    var jqBtn = $('#sign-up,#sign-in');
    mSignModal.bindModal(jqBtn);

    // 绑定搜索相关的事件
    mSearch.bind();


    // 退出按钮 绑定事件
    $('#logout').on('click', function (event) {
      event.preventDefault();

      mAuth.logout();
    });
  });
});
