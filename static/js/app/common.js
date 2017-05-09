/**
 * @title 公共文件
 * @fileOverView 所有页面共用部分。
 * 本文件用于放置所有页面都会使用的代码，例如：
 *  1.导航中的搜索。
 *  2.登录/登出
 *  3.设置页面最小高度。
 *  4.
 * @author whdstyle@gmail.com
 */

define(function (require) {
  var $ = require('jquery');
  var mAuth = require('components/sign/auth');
  var mSignModal = require('components/sign/sign-modal');
  var mUtil = require('components/util');
  $(function () {
   // ************************************
   // 通用
   // ************************************
    // 向 auth 模块中加入导航的 登录/登出 的状态更新。
    mAuth.addNoticeList(
      function () {
        $('#sign-wrap').addClass('signed');
      },
      function () {
        $('#sign-wrap').removeClass('signed');
      }
    );

    // 设置页面内容区域的最小高度
    var oHeight = {};
    oHeight.navbar = document.getElementsByTagName('nav')[0].offsetHeight;
    oHeight.footer = document.getElementsByTagName('footer')[0].offsetHeight;
    oHeight.mainMinHeight = window.innerHeight - oHeight.navbar - oHeight.footer;
    document.getElementsByTagName('main')[0].style.minHeight = oHeight.mainMinHeight + 'px';

    // 检测已登录，更新登录成功关联模块
    if (mAuth.isLogined()) {
      mAuth.updateLoginStatus();
    }

   // ************************************
   // 导航
   // ************************************
    // 登录/注册按钮绑定 模态框 事件
    mSignModal.bindModal($('#sign-up,#sign-in'));
    // 退出按钮 绑定事件
    $('#logout').on('click', function (event) {
      event.preventDefault();
      mAuth.logout();
    });

    // 搜索功能
    // 获取输入框输入字符，跳转搜索页面
    function skipPage () {
      var sKeyword = $('#search-input').val();
      if (sKeyword !== '') {
        window.open(mUtil.getSkipUrl('/course-search.html?q=' + sKeyword), '_self');
      }
    }
    // 绑定按钮提交事件
    $('#search-btn').on('click', function (event) {
      event.preventDefault();
      skipPage();
    });
    // 绑定回车提交事件
    $('.navbar-form').keydown(function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        skipPage();
      }
    });
  });
});
