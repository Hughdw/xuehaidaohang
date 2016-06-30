// 当登录状态发生变化或者刷新页面时，进行相关操作。
// 每次刷新页面判断当前
define(function(require) {
  var $ = require('jquery'),
      mSession = require('./session');
  var auth = {};
  // 广播通知的模块列表
  auth.noticeList = [];
  // 返回是否已登录
  auth.isAuthenticated = function() {
    // return mCookies
  };
  // 登录成功后，保存token，获取用户个人信息。
  auth.login = function(token) {
    // 将token保存到cookie中
    mSession.saveToken(token);
    // 进行广播，触发相关模块进行响应
  };
  // 退出后，删除token，删除用户个人信息。
  auth.loginOut = function() {
    // body...
  };
  auth.addNoticeList = function() {
    // body...
  };
  return auth;
});
