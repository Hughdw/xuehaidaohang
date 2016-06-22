angular.module('api',[])
.factory('apiURL', function() {
  var oServiceApi = {};
  // var sHost = 'http://xuehaidaohanglocalapi.com:5500';
  var sHost = 'http://www.quick.com:8081/api';
  var testPostfix = '';
  // var sHost = 'https://xuehaidaohang.wilddogio.com/api';
  // var testPostfix = '.json';
  // 图片验证码
  oServiceApi.imgCaptcha = 'http://www.quick.com:8081/api/getCaptcha';
  // 发送手机验证码
  oServiceApi.mobileCode = sHost + '/sendMobileCode' + testPostfix;
  // 发送邮箱验证码
  oServiceApi.mailCode = sHost + '/sendMailCode' + testPostfix;
  // 验证验证码
  oServiceApi.verifyCode = sHost + '/verifyCode' + testPostfix;
  // 通过手机重置密码
  oServiceApi.updateMobilePassword = sHost + '/updateMobilePassword' + testPostfix;
  // 通过邮箱重置密码
  oServiceApi.updateMailPassword = sHost + '/updateMailPassword' + testPostfix;
  // 判断账号是否存在
  oServiceApi.checkUsername = sHost + '/isUserReg' + testPostfix;
  // 注册账号
  oServiceApi.register = sHost +'/register' + testPostfix;
  // 本地使用Deployd做测试API时，需要把请求字符串转换成小写。
  // for(var p in oServiceApi){
  //   if (typeof p === 'string') {
  //     oServiceApi[p] = oServiceApi[p].toLowerCase();
  //   }
  // }

  return oServiceApi;
})
.factory('apiService', function($q, $http, apiURL) {
  var oService = {};
  var fnPretreatment = function(answer,deferred) {
    // 对后台返回的状态码做预处理
    // 200返回执行，401拒绝
    if (answer.data.code == 200) {
      answer.status = true;
      deferred.resolve(answer.data);
    } else if (answer.data.code > 200) {
      answer.status = false;
      deferred.reject(answer.data);
    }
  };
  // 获取图片验证码
  oService.getImgCaptcha = function() {
    return apiURL.imgCaptcha + '?v=' + Math.random();
  };
  // 获取短信验证码
  oService.getMobileCode = function(type,mobile) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.mobileCode,{
      params:{
        reg:type,
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
  // 获取邮件验证码
  oService.getMailCode = function(type,mail) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.mailCode,{
      params:{
        reg:type,
        email:mail
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
  // 校验验证码
  oService.verifyCode = function(type,code) {
    var oVerifyType;
    switch (type) {
      case 'mobile':
        oVerifyType = {activationMobileCode:code};
        break;
      case 'mail':
        oVerifyType = {activationMailCode:code};
        break;
      case 'img':
        oVerifyType = {captcha:code};
        break;
      default:
        oVerifyType = {};
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
  // 找回密码 - 通过手机重置密码
  oService.updateMobilePassword = function(mobile,password,confirmpassword,token) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.updateMobilePassword,{
      params:{
        mobile:mobile,
        password:password,
        repassword:confirmpassword
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
  // 找回密码 - 通过邮箱重置密码
  oService.updateMailPassword = function(mail,password,confirmpassword,token) {
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.updateMailPassword,{
      params:{
        email:mail,
        password:password,
        repassword:confirmpassword
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
  // 检查账号是否存在
  oService.checkUsername = function(type,username) {
    var oParams;
    if (type === 'mobile') {
      oParams = {mobile:username};
    } else if (type === 'email') {
      oParams = {email:username};
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.checkUsername,{
      params:oParams
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
  // 注册账号
  oService.register = function(type,username,password,repassword) {
    var oData;
    if (type === 'mobile') {
      oData = {mobile:username,password:password,repassword:repassword};
    } else if (type === 'email') {
      oData = {email:username,password:password,repassword:repassword};
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.post(apiURL.register,oData);
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
});
