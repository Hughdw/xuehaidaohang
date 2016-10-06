define(function(require) {
  var oData = {};
  var oNewData = {
    sidebar : {},
    account : {},
    progress : {},
    recharge : {},
    purchase : {},
    preferential : {}
  };
  var currentNav;

  // 记录当前侧导航的下标，在渲染模板时，
  function fnRoute (route) {
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
  }
  // 秒数转换成描述性的剩余时间
  function timeStamp(second_time){
    var time = parseInt(second_time) + "秒";
    if (parseInt(second_time) > 60) {

      var second = parseInt(second_time) % 60;
      var min = parseInt(second_time / 60);
      time = min + "分" + second + "秒";
      if (min > 60) {
        min = parseInt(second_time / 60) % 60;
        var hour = parseInt(parseInt(second_time / 60) / 60);
        time = hour + "小时" + min + "分" + second + "秒";
        if (hour > 24) {
          hour = parseInt(parseInt(second_time / 60) / 60) % 24;
          var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
          time = day + "天" + hour + "小时" + min + "分" + second + "秒";
        }
      }
    }
    return time;
  }
  // 重新组织数据
  oData.regroupSidebar = function(userData,route) {
    fnRoute(route);
    oNewData.sidebar.name = userData.name;
    // oNewData.sidebar.name = '小丸子子';
    oNewData.sidebar.sideAvatar = userData.avatar;
    // oNewData.sidebar.sideAvatar = 'static/img/personal/personal-avatar-2-pc.gif';
    oNewData.sidebar.balance = userData.total;
    oNewData.sidebar.activeMenu = currentNav;
    oNewData.sidebar.list = [
      {
        txt:'账户资料',
        url:'/personal-center.html#account'
      },
      {
        txt:'学习进度',
        url:'/personal-center.html#progress'
      },
      {
        txt:'充值记录',
        url:'/personal-center.html#recharge-records'
      },
      {
        txt:'购买记录',
        url:'/personal-center.html#purchase-records'
      },
      {
        txt:'优惠信息',
        url:'/personal-center.html#preferential'
      }
    ];
    return oNewData.sidebar;
  };
  oData.regroupAccount = function(accountData,userData) {
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
  oData.regroupProgress = function(progressData) {
    // userData 暂时没用上
    // 目前的数据有部分字段不是实时更新：begin、playtime、num、title
    oNewData.progress.list = [];
    for (var i = 0; i < progressData.length; i++) {
      oNewData.progress.list[i] = {};
      oNewData.progress.list[i].pid = progressData[i].pid;
      oNewData.progress.list[i].num = progressData[i].num;
      oNewData.progress.list[i].title = progressData[i].title;
      oNewData.progress.list[i].begindate = progressData[i].begindate;//观看日期
      oNewData.progress.list[i].begintime = progressData[i].begintime;//观看时间
      //剩余时间
      // oNewData.progress.list[i].remainingtime = timeStamp(progressData[i].remainingtime);
      oNewData.progress.list[i].remainingtime = timeStamp(43124);
      //开始播放位置的百分比
      // oNewData.progress.list[i].playStart = progressData[i].starttime/progressData[i].playtime*100;
      oNewData.progress.list[i].playStart = Math.round(120/1020*100);
      //播放时长的百分比
      // oNewData.progress.list[i].playLength = Math.round((progressData[i].lasttime - progressData[i].starttime)*100);
      oNewData.progress.list[i].playLength = Math.round((600 - 120)/1020*100);
    }
    // oNewData.progress.list = progressData;
    return oNewData.progress;
  };
  oData.regroupPreferential = function(preferentialData) {
    // oNewData.preferential.
  };
  return oData;
});
