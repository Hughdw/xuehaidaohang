// 负责将token，用户信息等存入cookies中
define(function(require) {
  var $ = require('jquery'),
      Cookies = require('jq-cookie'),
      mApi = require('../api');
  var oSession = {};
  oSession.user = {
    token:'',
    email:''
  };
  oSession.isValid = function() {

  };
  oSession.saveToken = function(token,fn) {
    // 保存token到cookie中
    Cookies.set('token',token);
    // 把token保存到
    oSession.user.token = token;
    // 保存用户信息到cookie中
    oSession.createUser();
  };
  oSession.createUser = function() {
    // 将用户的个人信息保存到cookies中
    mApi.getAuthUser(oSession.user.token)
    .done(function(success) {
      console.log(success);
    })
    .fail(function(error) {
      console.log(error);
    });
  };
  return oSession;
});
