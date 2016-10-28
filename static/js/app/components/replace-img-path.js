/**
 * 替换图片路径
 * 放弃使用
 */
define(function (require) {
  var mUtil = require('components/util');
  // 非移动端设备（PC、平板）批量替换IMG标签中的路径
  // 替换更大的图片
  // 测试时，会将ipad归到desktop()，因此使用mobile()
  return function() {
    if (mUtil.isPC) {
      for (var i = 0; i < document.images.length; i++) {
        // document.images[i].src =
        var aResult = /.gif$|.jpg$|.png$/i.exec(document.images[i].src);
        var sReplaceStr = '-pc'+aResult[0];
        document.images[i].src = aResult.input.replace(/.gif$|.jpg$|.png$/i,sReplaceStr);
      }
    }
  };

});
