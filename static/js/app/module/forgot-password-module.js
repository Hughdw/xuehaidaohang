// angularjs 与 requirejs 结合的相关文件，暂时没有删除
define(function(require) {
  var angular = require('angular');
  require('ngRoute');
  // require('ngMock');
  return angular.module('findPDApp',['ngRoute']);
  // body...
});
