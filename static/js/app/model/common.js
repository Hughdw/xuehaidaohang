/**
 * define函数用来定义模块
 * 公共组件
 */
define(function (require) {
  var oHeight = {};
  oHeight.navbar = document.getElementsByClassName('navbar-gps')[0].offsetHeight;
  oHeight.footer = document.getElementsByTagName('footer')[0].offsetHeight;
  oHeight.mainMinHeight = window.innerHeight - oHeight.navbar - oHeight.footer;
  document.getElementsByTagName('main')[0].style.minHeight = oHeight.mainMinHeight + 'px';
});
