/**
 * 所有页面都需要用到的模块，在这里引入
 */
define(function (require) {
  var $ = require('jquery');
  var mAuth = require('components/sign/auth');
  var mNav = require('components/nav');
  $(function () {
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
  });
});
