angular.module('findPDApp')
.factory('timer',function() {

})
.factory('apiURL', function() {
  var oServiceApi = {};
  var sHost = 'http://www.quick.com:8081';
  var testPostfix = '';
  // var sHost = 'https://xuehaidaohang.wilddogio.com';
  // var testPostfix = '.json';
  // 图片验证码
  oServiceApi.imgCaptcha = 'http://www.quick.com:8081/api/getCaptcha';
  // 发送手机验证码
  oServiceApi.mobileCode = sHost + '/api/sendMobileCode' + testPostfix;
  // 发送邮箱验证码
  oServiceApi.mailCode = sHost + '/api/sendMailCode' + testPostfix;
  // 验证验证码
  oServiceApi.verifyCode = sHost + '/api/verifyCode' + testPostfix;
  return oServiceApi;
})
.factory('CAPTCHAService', function($q, $http, apiURL) {
  var oService = {};
  var fnPretreatment = function(answer,deferred) {
    // 对后台返回的状态码做预处理
    // 200返回执行，401拒绝
    if (answer.data.code == 200) {
      answer.status = true;
      deferred.resolve(answer.data);
    } else if (answer.data.code == 401) {
      answer.status = false;
      deferred.reject(answer.data);
    }
  };

  oService.getImgCaptcha = function() {
    return apiURL.imgCaptcha + '?v=' + Math.random();
  };
  oService.getMobileCode = function(mobile) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.mobileCode,{
      params:{
        reg:0,
        mobile:mobile
      }
    });
    oPromise.then(
      function(answer) {
        fnPretreatment(answer,oDeferred);
      },
      function(error) {
        oDeferred.reject(error);
      }
    );
    return oDeferred.promise;
  };
  oService.getMailCode = function(email) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.mobileCode,{
      params:{
        reg:0,
        mobile:mobile
      }
    });
    oPromise.then(
      function(answer) {
        fnPretreatment(answer,oDeferred);
      },
      function(error) {
        oDeferred.reject(error);
      }
    );
    return oDeferred.promise;
  };
  oService.verifyCode = function(type,code) {
    var oVerifyType;
    switch (type) {
      case 'mobileCaptcha':
        oVerifyType = {activationMobileCode:code};
        break;
      case 'mailCaptcha':
        oVerifyType = {activationMailCode:code};
        break;
      default:
        oVerifyType = {captcha:code};
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.verifyCode,{
      params:oVerifyType
    });
    oPromise.then(
      function(answer) {
        fnPretreatment(answer,oDeferred);
      },
      function(error) {
        oDeferred.reject(error);
      }
    );
    // 与当前oDeferred有关的oPromise对象。
    return oDeferred.promise;
  };
  return oService;
})
