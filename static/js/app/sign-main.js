/**
 * @title 登录模块入口文件
 * @fileOverView 本文件用于配置路由，配置HTTP请求，声明依赖。
 * @author whdstyle@gmail.com
 */
angular.module('signApp', ['ngRoute', 'formCheck', 'api-service', 'sign-service'])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: './views/sign/login.html'
  })
  .when('/register', {
    templateUrl: './views/sign/register.html'
  })
  .otherwise({
    templateUrl: './views/sign/login.html'
  });
  $httpProvider.defaults.transformRequest = function (obj) {
    var str = [];
    for (var p in obj) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
    return str.join('&');
  };

  $httpProvider.defaults.headers.post = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
});
