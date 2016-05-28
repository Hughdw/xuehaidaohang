/**
 * define函数用来定义模块
 * 设置页面的最小高度
 */
define(function (require) {
  var $ = require('jquery');
  $(function(){
    // 设置页面内容区域的最小高度
    var oHeight = {};
    oHeight.navbar = document.getElementsByTagName('nav')[0].offsetHeight;
    oHeight.footer = document.getElementsByTagName('footer')[0].offsetHeight;
    oHeight.mainMinHeight = window.innerHeight - oHeight.navbar - oHeight.footer;
    document.getElementsByTagName('main')[0].style.minHeight = oHeight.mainMinHeight + 'px';
  });
});
