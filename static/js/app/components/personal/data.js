define(function(require) {
  var oData = {};
  var oNewData = {
    sidebar : {},
    account : {},
  };
  var currentNav;

  // 记录当前侧导航的下标
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
  oData.regroupSidebar = function(data,route) {
    fnRoute(route);
    oNewData.sidebar.name = data.name;
    // oNewData.sidebar.name = '小丸子子';
    oNewData.sidebar.sideAvatar = data.avatar;
    // oNewData.sidebar.sideAvatar = 'static/img/personal/personal-avatar-2-pc.gif';
    oNewData.sidebar.balance = data.total;
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
    // oNewData.account.avatarList = [
    //   'static/img/personal/personal-avatar-1-pc.gif',
    //   'static/img/personal/personal-avatar-2-pc.gif',
    //   'static/img/personal/personal-avatar-3-pc.gif',
    //   'static/img/personal/personal-avatar-4-pc.gif',
    //   'static/img/personal/personal-avatar-5-pc.gif',
    //   'static/img/personal/personal-avatar-6-pc.gif'
    // ];
    return oNewData.account;
  };
  return oData;
});
