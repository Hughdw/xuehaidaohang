/**
 * 忘记密码模块 入口文件，以及依赖的模块
 * 配置路由
 */
angular.module('findPDApp', ['ngRoute', 'formCheck', 'api'])
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
