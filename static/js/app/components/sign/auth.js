// 当登录状态发生变化或者刷新页面时，进行相关操作。
// 每次刷新页面判断当前
define(function(require) {
  var mSession = require('./session');
  var auth = {};
  // 登录状态发生变化时，需要通知的模块列表
  auth.noticeList = [];
  // 返回是否已登录
  auth.isAuthenticated = function() {
    return !!mSession.user.token;
  };
  // 登录成功后，保存token
  // 进行一些和登录有关的操作
  auth.login = function(token) {
    // 将token保存到cookie中
    mSession.createUser(token);
    // 进行通知，触发相关模块进行响应
    auth.updateLoginStatus();
  };
  // 退出后，删除token
  // 进行一些和退出登录有关的操作
  auth.logout = function() {
    mSession.destroyUser();
    // 进行通知，触发相关模块进行响应
    auth.updateLogoutStatus();
  };
  // 遍历调用模块列表中的模块的对应方法。
  auth.updateLoginStatus = function() {
    for (var i = 0; i < auth.noticeList.length; i++) {
      auth.noticeList[i].login();
    }
  };
  // 遍历调用模块列表中的模块的对应方法。
  auth.updateLogoutStatus = function() {
    for (var i = 0; i < auth.noticeList.length; i++) {
      auth.noticeList[i].logout();
    }
  };
  // 向模块列表中添加需要监控登录状态的元素。
  auth.addNoticeList = function(mod) {
    // 导航状态变更
    // 购物车信息变更
    // 支付页面信息变更
    auth.noticeList.push(mod);
  };
  return auth;
});
