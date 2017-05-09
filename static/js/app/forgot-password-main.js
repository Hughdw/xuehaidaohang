/**
 * @title 忘记密码模块入口文件
 * @fileOverView 本文件用于配置路由，声明依赖。
 * @author whdstyle@gmail.com
 */
angular.module('findPDApp', ['ngRoute', 'formCheck', 'api-service'])
.config(function ($routeProvider) {
  $routeProvider
  .when('/findType', {
    templateUrl: './views/forgotpassword/findType.html'
  })
  .when('/mobile', {
    templateUrl: './views/forgotpassword/mobile.html?bust=' + (new Date()).getTime()
  })
  .when('/email', {
    templateUrl: './views/forgotpassword/email.html'
  })
  .otherwise({
    templateUrl: './views/forgotpassword/findType.html'
  });
});
