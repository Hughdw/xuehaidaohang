// angular route配置
define(function(require) {
  'use strict';
  var ngModule = require('../module/forgot-password-module');
  ngModule.config(function($routeProvider) {
    $routeProvider
    .when('/findType',{
      templateUrl:'./views/forgotpassword/findType.html'
    })
    .when('/mobile',{
      templateUrl:'./views/forgotpassword/mobile.html'
    })
    .when('/email',{
      templateUrl:'./views/forgotpassword/email.html'
    })
    .otherwise({
      templateUrl:'./views/forgotpassword/findType.html'
    });
  });
});
