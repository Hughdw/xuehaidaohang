/**
 * define函数用来定义模块
 * 工具模块
 */
define(function (require) {
  var $ = require('jquery'),
      mDevice = require('device');
  var util = {};
  // 判断是否为PC端
  util.isPC = !mDevice.mobile();
  // 获取URL中指定参数的值
  util.getQueryString = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
    return r === null ? null : unescape(r[2]);
	};
  // 获取地址中#号之后的内容
  util.strGetHash = function(str) {
    var start = str.indexOf('#',0);
    return str.substring(start);
  };
  return util;
});
