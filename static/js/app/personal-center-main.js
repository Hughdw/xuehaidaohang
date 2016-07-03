define(function (require) {
  var mUtil = require('./components/util'),
      mApi = require('./components/api'),
      mAuth = require('./components/sign/auth'),
      mSession = require('./components/sign/session'),
      mSignModal = require('./components/sign/sign-modal'),
      mData = require('./components/personal/data'),
      mAccountMain = require('./components/personal/account-main'),
      tplSidebar = require('tpl/personal/sidebar');
  $(function() {
    // 向auth模块中加入导航的登录/登出方法。
    var oPersonalSign = {};
    oPersonalSign.login = function() {
      fnLoadSidebar();
    };
    oPersonalSign.logout = function() {

    };
    mAuth.addNoticeList(oPersonalSign);

    // 共用的用户信息
    var oUserData;

    // 加载侧导航
    function fnLoadSidebar () {
      var sHash = location.hash;
      var token = mSession.user.token;
      // 获取用户信息，加载侧导航
      mApi.getAuthUser(token)
      .done(function(success) {
        console.log(success);
        oUserData = success.data[0].user;
        // 重新组织列表的数据
        var sideData = mData.regroupSidebar(oUserData,sHash);
        // 渲染侧导航
        document.getElementById('sidebar').innerHTML = tplSidebar(sideData);

        // 绑定按钮事件
        $('.menu-list').on('click', '.menu-list-link', function(event) {
          var sHref = $(this).attr('href');
          var route = mUtil.strGetHash(sHref);

          // 侧导航按钮切换主内容
          fnLoadMain(oUserData,route);
        });
        // 加载完侧导航，加载主内容
        fnLoadMain(oUserData,sHash);
      })
      .fail(function(error) {
        // token过期自动登出
        mAuth.logout();
        // 同时弹出登录对话框
        mSignModal.showModal();
      });
    }
    // 加载内容区域
    function fnLoadMain (userData,route) {
      var token = mSession.user.token;
      // 渲染个人中心不同页面的数据
      switch (route) {
        case '#account':
          // 加载用户资料的内容
          mAccountMain.loadContent(userData,token);
          break;
        case '#progress':
          //
          break;
        case '#recharge-records':

          break;
        case '#purchase-records':

          break;
        case '#preferential':

          break;
        default:
          mAccountMain.loadContent(oUserData,token);
      }
    }

    // 已登录状态，加载数据
    if (mAuth.isAuthenticated()) {
      fnLoadSidebar();
    } else {
      // 登录失效时
      // token过期自动登出
      mAuth.logout();
      // 同时弹出登录对话框
      mSignModal.showModal();
    }

  });
});
