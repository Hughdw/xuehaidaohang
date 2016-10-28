/**
 * 登录状态管理
 */

// 使用观察者模式，当登录状态发生变化时，对模块列表进行对应的操作。
define(function (require) {
  var mSession = require('components/sign/session');

  var _notificationList = []; // 登录状态发生变化时，需要通知的模块列表

  var auth = {
    // 是否已登录（被观察者的状态）
    isLogined (token) {
      return !!mSession.getToken;
    },
    // 登录成功后
    login (token) {
      console.log(1);
      // 将token保存到cookie中
      mSession.createUser(token);
      // 通知相关模块进行响应
      auth.updateLoginStatus();
    },
    // 退出成功后
    logout () {
      // 删除暂存token
      globalModule.deleteToken();
      // 删除cookie中的token
      mSession.destroyUser();
      // 通知相关模块进行响应
      auth.updateLogoutStatus();
    },
    // 向模块列表中添加需要监控登录状态的元素。
    addNoticeList (fnLogin, fnLogout) {
      var oModule = {
        login: fnLogin,
        logout: fnLogout
      };
        // 导航状态变更 - 已添加
        // 个人中心 - 已添加
        // 购物车信息变更
        // 支付页面信息变更
      _notificationList.push(oModule);
    },
    // 遍历模块列表中的模块，并调用对应的登录方法。
    updateLoginStatus () {
      for (var i = 0; i < _notificationList.length; i++) {
        _notificationList[i].login();
      }
    },
    // 遍历模块列表中的模块，并调用对应的退出方法。
    updateLogoutStatus () {
      for (var i = 0; i < _notificationList.length; i++) {
        _notificationList[i].logout();
      }
    }
  };

  return auth;
});
