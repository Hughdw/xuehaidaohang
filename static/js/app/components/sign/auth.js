// 登录状态管理
// 使用观察者模式，当登录状态发生变化时，对模块列表进行对应的操作。
define(function(require) {
  var mSession = require('components/sign/session');
  var auth = {};
  // 登录状态发生变化时，需要通知的模块列表
  auth.noticeList = [];
  // 被观察者的状态：是否已登录
  auth.isAuthenticated = function() {
    return !!mSession.user.token;
  };
  // 登录成功后，保存token、通知相关模块进行响应
  auth.login = function(token) {
    // 将token保存到cookie中
    mSession.createUser(token);
    // 通知相关模块进行响应
    auth.updateLoginStatus();
  };
  // 退出后，删除token、通知相关模块进行响应
  auth.logout = function() {
    mSession.destroyUser();
    // 通知相关模块进行响应
    auth.updateLogoutStatus();
  };
  // 遍历模块列表中的模块，并调用对应的登录方法。
  auth.updateLoginStatus = function() {
    for (var i = 0; i < auth.noticeList.length; i++) {
      auth.noticeList[i].login();
    }
  };
  // 遍历模块列表中的模块，并调用对应的退出方法。
  auth.updateLogoutStatus = function() {
    for (var i = 0; i < auth.noticeList.length; i++) {
      auth.noticeList[i].logout();
    }
  };
  // 向模块列表中添加需要监控登录状态的元素。
  auth.addNoticeList = function(mod) {
    // 导航状态变更 - 已添加
    // 个人中心 - 已添加
    // 购物车信息变更
    // 支付页面信息变更
    auth.noticeList.push(mod);
  };
  return auth;
});
