define(function(require) {
  var $ = require('jquery');
  var oUrl = {};
  var sHost = 'http://www.quick.com:8081/api';
  var testPostfix = '';
  oUrl.getAuthUser = sHost + '/getAuthUser' + testPostfix;
  oUrl.getcategory = sHost + '/getcategory' + testPostfix;
  oUrl.testUrl = sHost + '/isUserReg' + testPostfix;

  var api = {};
  var fnPretreatment = function(answer,deferred) {
    // 对后台返回的状态码做预处理
    if (answer.code == 200) {
      answer.status = true;
      // 200返回到成功回调函数中seccess
      deferred.resolve(answer);
    } else if (answer.code > 200) {
      answer.status = false;
      // 401返回到失败回调函数中error
      deferred.reject(answer);
    }
  };

  // 获取用户信息
  api.getAuthUser = function(token) {
    var oDeferred = $.Deferred();
    // $.get(oUrl.testUrl,{email:'whd007@163.com'})
    // .done(function(answer) {
    //   fnPretreatment(answer,oDeferred);
    // })
    // .fail(function(error) {
    //   oDeferred.reject(error);
    // });
    $.get(oUrl.getAuthUser,{token:token})
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  };
  // 获取视频目录
  api.getcategory = function() {
    var oDeferred = $.Deferred();
    $.get(oUrl.getcategory)
    .done(function(answer) {
      fnPretreatment(answer,oDeferred);
    })
    .fail(function(error) {
      oDeferred.reject(error);
    });
    return oDeferred.promise();
  }

  return api;
});
