/**
 * define函数用来定义模块
 * 全局变量
 */
define(function (require) {
  var $ = require('jquery');
  var mDevice = require('device');
  var clientStatus = {
    isPC : !mDevice.mobile()
  };
  return clientStatus;
});
