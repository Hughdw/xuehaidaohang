/**
 * define函数用来定义模块
 * 所有页面都需要用到的模块，在这里引入
 */
define(function (require) {
  var $ = require('jquery'),
      mAuth = require('components/sign/auth'),
      mNav = require('components/nav');
  $(function(){
    // 设置页面内容区域的最小高度
    var oHeight = {};
    oHeight.navbar = document.getElementsByTagName('nav')[0].offsetHeight;
    oHeight.footer = document.getElementsByTagName('footer')[0].offsetHeight;
    oHeight.mainMinHeight = window.innerHeight - oHeight.navbar - oHeight.footer;
    document.getElementsByTagName('main')[0].style.minHeight = oHeight.mainMinHeight + 'px';

    // 已登录状态，更新所有对应模块的状态。
    if (mAuth.isAuthenticated()) {
      mAuth.updateLoginStatus();
    }

  });
});
