/**
 * @title 重新组织数据局模块
 * @fileOverView 本文件用于将后台获取到的数据重新组织，增加一些帮助判断的字段，以便相关模块可以更好的使用。
 * @author whdstyle@gmail.com
 */
define(function (require) {
 // ************************************
 // 声明
 // ************************************
  var oRegroupData = {};
  var oNewData = {
    sidebar: {},
    account: {},
    progress: {},
    recharge: {},
    purchase: {},
    preferential: {}
  };

 // ************************************
 // 内部方法
 // ************************************
  // 记录当前侧导航的下标，在渲染模板时，
  function getCurrentNav (route) {
    var currentNav;
    switch (route) {
      case '#account':
        currentNav = 0;
        break;
      case '#progress':
        currentNav = 1;
        break;
      case '#recharge-records':
        currentNav = 2;
        break;
      case '#purchase-records':
        currentNav = 3;
        break;
      case '#preferential':
        currentNav = 4;
        break;
      default:
        currentNav = 0;
    }
    return currentNav;
  }
  // 秒数转换成描述性的剩余时间
  function timeStamp (secondTime) {
    var time = parseInt(secondTime) + '秒';
    if (parseInt(secondTime) > 60) {
      var second = parseInt(secondTime) % 60;
      var min = parseInt(secondTime / 60);
      time = min + '分' + second + '秒';
      if (min > 60) {
        min = parseInt(secondTime / 60) % 60;
        var hour = parseInt(parseInt(secondTime / 60) / 60);
        time = hour + '小时' + min + '分' + second + '秒';
        if (hour > 24) {
          hour = parseInt(parseInt(secondTime / 60) / 60) % 24;
          var day = parseInt(parseInt(parseInt(secondTime / 60) / 60) / 24);
          time = day + '天' + hour + '小时' + min + '分' + second + '秒';
        }
      }
    }
    return time;
  }

 // ************************************
 // 对外暴露方法
 // ************************************
  // 重新组织侧导航数据
  oRegroupData.sidebar = function (userData, route) {
    var currentNav = getCurrentNav(route);
    oNewData.sidebar.name = userData.name;
    // oNewData.sidebar.name = '小丸子子';
    oNewData.sidebar.sideAvatar = userData.avatar;
    // oNewData.sidebar.sideAvatar = 'static/img/personal/personal-avatar-2-pc.gif';
    oNewData.sidebar.balance = userData.total;
    oNewData.sidebar.activeMenu = currentNav;
    oNewData.sidebar.list = [
      {
        txt: '账户资料',
        url: '/personal-center.html#account'
      },
      {
        txt: '学习进度',
        url: '/personal-center.html#progress'
      },
      {
        txt: '充值记录',
        url: '/personal-center.html#recharge-records'
      },
      {
        txt: '购买记录',
        url: '/personal-center.html#purchase-records'
      },
      {
        txt: '优惠信息',
        url: '/personal-center.html#preferential'
      }
    ];
    return oNewData.sidebar;
  };
  // 重新组织账户资料的数据
  oRegroupData.account = function (accountData, userData) {
    // 用户是否已经设置或绑定了对应资料
    oNewData.account.avatar = oNewData.sidebar.sideAvatar;
    oNewData.account.name = oNewData.sidebar.name;
    oNewData.account.mobile = userData.mobile;
    oNewData.account.email = userData.email;
    oNewData.account.avatarList = [];
    for (var i = 0; i < accountData.length; i++) {
      oNewData.account.avatarList.push(accountData[i]);
    }
    return oNewData.account;
  };
  // 重新组织学习进度的数据
  oRegroupData.progress = function (progressData) {
    // userData 暂时没用上
    // 目前的数据有部分字段不是实时更新：begin、playtime、num、title
    oNewData.progress.list = [];
    for (var i = 0; i < progressData.length; i++) {
      oNewData.progress.list[i] = {};
      oNewData.progress.list[i].pid = progressData[i].pid;
      oNewData.progress.list[i].num = progressData[i].num;
      oNewData.progress.list[i].title = progressData[i].title;
      oNewData.progress.list[i].begindate = progressData[i].begindate;// 观看日期
      oNewData.progress.list[i].begintime = progressData[i].begintime;// 观看时间
      // 剩余时间
      // oNewData.progress.list[i].remainingtime = timeStamp(progressData[i].remainingtime);
      oNewData.progress.list[i].remainingtime = timeStamp(43124);
      // 开始播放位置的百分比
      // oNewData.progress.list[i].playStart = progressData[i].starttime/progressData[i].playtime*100;
      oNewData.progress.list[i].playStart = Math.round(120 / 1020 * 100);
      // 播放时长的百分比
      // oNewData.progress.list[i].playLength = Math.round((progressData[i].lasttime - progressData[i].starttime)*100);
      oNewData.progress.list[i].playLength = Math.round((600 - 120) / 1020 * 100);
    }
    // oNewData.progress.list = progressData;
    return oNewData.progress;
  };
  // 重新组织优惠信息的数据
  oRegroupData.preferential = function (preferentialData) {
    // oNewData.preferential.
  };
  return oRegroupData;
});
