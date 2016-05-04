/**
 * define函数用来定义模块
 * 公共组件
 */
define(function (require) {
  var mDevice = require('device');
  // 非移动端设备（PC、平板）批量替换IMG标签中的路径
  // 替换更大的图片
  // 测试时，会将ipad归到desktop()，因此使用mobile()
  if (!mDevice.mobile()) {
    for (var i = 0; i < document.images.length; i++) {
      // document.images[i].src =
      var aResult = /.gif$|.jpg$|.png$/i.exec(document.images[i].src);
      var sReplaceStr = '-pc'+aResult[0];
      document.images[i].src = aResult.input.replace(/.gif$|.jpg$|.png$/i,sReplaceStr);
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
