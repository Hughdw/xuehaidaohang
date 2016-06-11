define(function(require) {
  var angular = require('angular');
  require('ngRoute');
  // require('ngMock');
  // 转向纯angular应用，此页面暂时无用
  return angular.module('findPDApp',['ngRoute']);
  // body...
});
