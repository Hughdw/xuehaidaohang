/**
 * token以及用户信息的保存和移除
 */
define(function (require) {
  var Cookies = require('jq-cookie');

  /* 用户信息 */
  // 暂时不用
  var _oUser = {
    token: '',
    nickname: '', // 用户名
    balance: '', // 余额
    bindEmail: '', // 绑定邮箱
    bindMobile: '', // 绑定手机
    fail_time: '' // 过期时间，暂时用不上
  };
  var oSession = {
    // 将token保存到cookie中和oSession.user对象中
    createUser: function (token) {
      // 保存token到cookie中
      Cookies.set('token', token);
      _oUser.token = token;
    },
    // 退出时，移除cookie和oSession.user对象中的token
    destroyUser: function () {
      Cookies.remove('token');
      _oUser.token = Cookies.get('token');
    },
    // 获取cookies中的token
    getToken: Cookies.get('token')
  };

  // 登陆时，将常用信息保存到cookies中
  // oSession.updateUserInfo = function (name, balance, bindEmail, bindMobile) {
  //   // Cookies.set('nickname',name);
  //   // Cookies.set('balance',balance);
  //   // Cookies.set('bindEmail',bindEmail);
  //   // Cookies.set('bindMobile',bindMobile);
  //   // _oUser.nickname = name;
  //   // _oUser.balance = balance;
  //   // _oUser.bindEmail = bindEmail;
  //   // _oUser.bindMobile = bindMobile;
  // };

  return oSession;
});
