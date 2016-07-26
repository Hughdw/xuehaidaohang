angular.module('api', [])
// .constant('AUTH_EVENTS', {
//
// })
// // 储存session
// .service('authUser', function() {
//   // this.create = function(token,) {
//   //   // body...
//   // }
// })
.factory('apiURL', function() {
  var oServiceUrl = {};
  // 本地deployd测试地址
  // var sHost = 'http://xuehaidaohanglocalapi.com:5500';

  // 服务器API地址
  // var sHost = 'http://www.quick.com:8081/api';
  var sHost = 'http://139.196.173.103:8081/api';
  var testPostfix = '';

  // 野狗测试地址
  // var sHost = 'https://xuehaidaohang.wilddogio.com/api';
  // var testPostfix = '.json';

  // 图片验证码
  oServiceUrl.imgCaptcha = 'http://139.196.173.103:8081/api/getCaptcha';
  // 发送手机验证码
  oServiceUrl.mobileCode = sHost + '/sendMobileCode' + testPostfix;
  // 发送邮箱验证码
  oServiceUrl.mailCode = sHost + '/sendMailCode' + testPostfix;
  // 验证验证码
  oServiceUrl.verifyCode = sHost + '/verifyCode' + testPostfix;
  // 通过手机重置密码
  oServiceUrl.updateMobilePassword = sHost + '/updateMobilePassword' + testPostfix;
  // 通过邮箱重置密码
  oServiceUrl.updateMailPassword = sHost + '/updateMailPassword' + testPostfix;
  // 判断账号是否存在
  oServiceUrl.checkUsername = sHost + '/isUserReg' + testPostfix;
  // 注册账号
  oServiceUrl.register = sHost + '/register' + testPostfix;
  // 邮箱账号登录
  oServiceUrl.emailLogin = sHost + '/postEmailLogin' + testPostfix;
  // 手机账号登录
  oServiceUrl.mobileLogin = sHost + '/postMobileLogin' + testPostfix;
  // 本地使用Deployd做测试API时，需要把请求字符串转换成小写。
  // for(var p in oServiceUrl){
  //   if (typeof p === 'string') {
  //     oServiceUrl[p] = oServiceUrl[p].toLowerCase();
  //   }
  // }

  return oServiceUrl;
})
.factory('apiService', function($q, $http, apiURL) {
  var oService = {};
  var fnPretreatment = function(answer,deferred) {
    // 对后台返回的状态码做预处理
    if (answer.data.code == 200) {
      answer.status = true;
      // 200返回到成功回调函数中seccess
      deferred.resolve(answer.data);
    } else if (answer.data.code > 200) {
      answer.status = false;
      // 401返回到失败回调函数中error
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
  oService.verifyCode = function(type,code,account,accountType) {
    var oParams;
    switch (type) {
      case 'mobile':
        if (accountType === 'mobile') {
          oParams = {activationMobileCode:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {activationMobileCode:code,email:account};
        }
        break;
      case 'email':
        if (accountType === 'mobile') {
          oParams = {activationMailCode:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {activationMailCode:code,email:account};
        }
        break;
      case 'img':
        if (accountType === 'mobile') {
          oParams = {captcha:code,mobile:account};
        } else if (accountType === 'email') {
          oParams = {captcha:code,email:account};
        }
        break;
      default:
        oParams = {};
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.verifyCode,{
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
    var oParams;
    if (type === 'mobile') {
      oParams = {mobile:username,password:password,repassword:repassword};
    } else if (type === 'email') {
      oParams = {email:username,password:password,repassword:repassword};
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.get(apiURL.register,{
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
  // 登录
  oService.login = function(type,username,password) {
    var oParams,sLoginUrl;
    if (type === 'mobile') {
      oParams = {mobile:username,password:password};
      sLoginUrl = apiURL.mobileLogin;
    } else if (type === 'email') {
      oParams = {email:username,password:password};
      sLoginUrl = apiURL.emailLogin;
    }
    // 构建一个新的延迟实例
    var oDeferred = $q.defer();
    var oPromise = $http.get(sLoginUrl,{
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
  }
  return oService;
});
