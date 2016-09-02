/**
 * define函数用来定义模块
 * 工具模块
 */
define(function (require) {
  var $ = require('jquery'),
      mDevice = require('device');
  var oUtil = {};
  // 判断是否为PC端
  oUtil.isPC = !mDevice.mobile();
  // 获取URL中指定参数的值
  oUtil.getQueryString = function (name) {
		var reGetParm = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var sParmVal = window.location.search.substr(1).match(reGetParm);
    return sParmVal === null ? null : sParmVal[2];
	};
  // 获取地址中#号之后的内容
  oUtil.getHash = function(str) {
    var sStart = str.indexOf('#',0);
    return str.substring(sStart);
  };
  // 获取跳转链接
  oUtil.getSkipUrl = function(path) {
    var sProtocol = window.location.protocol;
    var sHost = window.location.host;
    var sSkipUrl = sProtocol + '//' + sHost + path;
    // 1.对要查询的关键词进行编码
    return encodeURI(sSkipUrl);
  };
  return oUtil;
});
