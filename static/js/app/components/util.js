/**
 * @title 工具模块
 * @fileOverView 本文件实现一些通用方法。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var mDevice = require('device');

 // ************************************
 // 对外暴露方法
 // ************************************
  return {
    // 判断是否为PC端
    isPC: function () {
      return !mDevice.mobile();
    },
    // 获取URL中指定参数的值
    getQueryString: function (name) {
      var reGetParm = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var sParmVal = window.location.search.substr(1).match(reGetParm);
      return sParmVal === null ? sParmVal : sParmVal[2];
    },
    // 获取地址中#号之后的内容
    getHash: function (str) {
      var sIndex = str.indexOf('#', 0);
      return str.substring(sIndex);
    },
    // 获取跳转链接
    getSkipUrl: function (path) {
      var sProtocol = window.location.protocol;
      var sHost = window.location.host;
      var sSkipUrl = sProtocol + '//' + sHost + path;
      // 1.对要查询的关键词进行编码
      return encodeURI(sSkipUrl);
    }
  };
});
