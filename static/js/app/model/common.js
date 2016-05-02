/**
 * define函数用来定义模块
 * 公共组件
 */
define(function (require) {
  var device = require('device');
  // 移动端批量替换IMG标签中的路径
  // 用来给移动端设备加载更小的图片
  if (device.mobile()) {
    for (var i = 0; i < document.images.length; i++) {
      // document.images[i].src =
      var result = /.gif$|.jpg$|.png$/i.exec(document.images[i].src);
      var txt = '-m'+result[0];
      document.images[i].src = result.input.replace(/.gif$|.jpg$|.png$/i,txt);
    }
  }
  $(function($){
    // 设置页面内容区域的最小高度
    var oHeight = {};
    oHeight.navbar = document.getElementsByClassName('navbar-gps')[0].offsetHeight;
    oHeight.footer = document.getElementsByTagName('footer')[0].offsetHeight;
    oHeight.mainMinHeight = window.innerHeight - oHeight.navbar - oHeight.footer;
    document.getElementsByTagName('main')[0].style.minHeight = oHeight.mainMinHeight + 'px';



  });

});
