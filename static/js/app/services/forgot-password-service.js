define(function(require) {
  'use strict';
  // var ngModule = require('../module/forgot-password-module');
  var angular = require('angular');

  var modNgService = angular.module('forgotPasswordService',[]);
  modNgService
  // constant() 方法总会在所有配置块之前被执行，可以将一个已经存在的变量值注册为服务，该服务可以注入到应用的其他部分使用
  .constant('addActiveClass', 'active')
  .service('tempService', function($scope) {
    // body...
  })
  .factory('apiURL', function() {
    // body...
    var host = 'http://www.quick.com:8081';
    return {
      getImgCaptcha:host + '/api/getCaptcha',
      getMobileCode:host + '/api/sendMobileCode',
      getMailCode:host + '/api/sendMailCode',
      verifyCode:host + '/api/verifyCode'
    };
  });
  return modNgService;

});
