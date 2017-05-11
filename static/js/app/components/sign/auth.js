/**
 * @title 登录状态管理模块
 * @fileOverView 本文件用于登录状态的更新，使用观察者模式，当登录状态发生变化时，对加入模块列表的元素执行对应 登录/退出 方法。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var mSession = require('components/sign/session');

 // ************************************
 // 声明
 // ************************************
  var aNotificationList = []; // 登录状态发生变化时，需要通知的模块列表

 // ************************************
 // 对外暴露方法
 // ************************************
  var oAuth = {
    // 是否已登录（被观察者的状态）
    isLogined: function (token) {
      return !!mSession.getToken();
    },
    // 登录成功，执行方法
    login: function (token) {
      // 将token保存到cookie中
      mSession.createUser(token);
      // 通知相关模块进行响应
      oAuth.updateLoginStatus();
    },
    // 退出成功，执行方法
    logout: function () {
      // 删除cookie中的token
      mSession.destroyUser();
      // 通知相关模块进行响应
      oAuth.updateLogoutStatus();
    },
    // 向模块列表中添加需要监控登录状态的元素。
    addNoticeList: function (loginFunc, logoutFunc) {
      var oModule = {
        login: loginFunc,
        logout: logoutFunc
      };
        // 导航状态变更 - 已添加
        // 个人中心 - 已添加
        // 购物车信息变更
        // 支付页面信息变更
      aNotificationList.push(oModule);
    },
    // 遍历模块列表中的模块，并调用对应的登录方法。
    updateLoginStatus: function () {
      for (var i = 0; i < aNotificationList.length; i++) {
        aNotificationList[i].login();
      }
    },
    // 遍历模块列表中的模块，并调用对应的退出方法。
    updateLogoutStatus: function () {
      for (var i = 0; i < aNotificationList.length; i++) {
        aNotificationList[i].logout();
      }
    }
  };

  return oAuth;
});
