// 负责token以及用户信息的保存和移除
define(function(require) {
  var Cookies = require('jq-cookie'),
      mApi = require('components/api');
  var oSession = {};
  // 常用信息
  oSession.user = {
    token:'',
    nickname:'',//用户名
    balance:'',//余额
    bindEmail:'',//绑定邮箱
    bindMobile:'',//绑定手机
    fail_time:'',//过期时间，暂时用不上
  };
  // 获取cookies中的token
  oSession.user.token = Cookies.get('token');
  // 登陆时，将常用信息保存到cookies中
  oSession.updateUserInfo = function(name,balance,bindEmail,bindMobile) {
    // Cookies.set('nickname',name);
    // Cookies.set('balance',balance);
    // Cookies.set('bindEmail',bindEmail);
    // Cookies.set('bindMobile',bindMobile);
    // oSession.user.nickname = name;
    // oSession.user.balance = balance;
    // oSession.user.bindEmail = bindEmail;
    // oSession.user.bindMobile = bindMobile;
  };
  // 将token保存到cookie中和oSession.user对象中
  oSession.createUser = function(token) {
    // 保存token到cookie中
    Cookies.set('token',token);
    oSession.user.token = token;
    // 获取用户信息
    // mApi.getAuthUser(token)
    // .done(function(success) {
    //   var nickname = success.data[0].user.nickname,
    //       balance = success.data[0].user.total,
    //       bindEmail = !!success.data[0].user.email,
    //       bindMobile = !!success.data[0].user.mobile;
    //
    //   //保存昵称到cookies中
    //   oSession.updateUserInfo(nickname,balance,bindEmail,bindMobile);
    //
    // })
    // .fail(function(error) {
    //   alert(error);
    // });
  };
  // 退出时，移除cookie和oSession.user对象中的token
  oSession.destroyUser = function() {
    Cookies.remove('token');
    oSession.user.token = Cookies.get('token');
  };
  return oSession;
});
