/**
 * @title session管理模块
 * @fileOverView 本文件用于处理token的获取、保存和移除。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var Cookies = require('jq-cookie');

 // ************************************
 // 声明
 // ************************************
  /* 用户信息 */
  // 暂时不用
  var oUser = {
    token: '',
    nickname: '', // 用户名
    balance: '', // 余额
    bindEmail: '', // 绑定邮箱
    bindMobile: '', // 绑定手机
    fail_time: '' // 过期时间，暂时用不上
  };

 // ************************************
 // 对外暴露方法
 // ************************************
  var oSession = {
    // 将token保存到cookie中和oSession.user对象中
    createUser: function (token) {
      // 保存token到cookie中
      Cookies.set('token', token);
      oUser.token = token;
    },
    // 退出时，移除cookie和oSession.user对象中的token
    destroyUser: function () {
      // 删除暂存token
      globalModule.deleteToken();
      Cookies.remove('token');
      oUser.token = Cookies.get('token');
    },
    // 获取cookies中的token
    getToken: function () {
      return Cookies.get('token');
    }
  };

  // 登陆时，将常用信息保存到cookies中
  // oSession.updateUserInfo = function (name, balance, bindEmail, bindMobile) {
  //   // Cookies.set('nickname',name);
  //   // Cookies.set('balance',balance);
  //   // Cookies.set('bindEmail',bindEmail);
  //   // Cookies.set('bindMobile',bindMobile);
  //   // oUser.nickname = name;
  //   // oUser.balance = balance;
  //   // oUser.bindEmail = bindEmail;
  //   // oUser.bindMobile = bindMobile;
  // };

  return oSession;
});
