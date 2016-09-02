// 用户中心主文件
define(function (require) {
  var $ = require('jquery'),
      mUtil = require('components/util'),
      mApi = require('components/api'),
      mAuth = require('components/sign/auth'),
      mSession = require('components/sign/session'),
      mSignModal = require('components/sign/sign-modal'),
      mData = require('components/personal/data'),
      mAccountMain = require('components/personal/account-main'),
      mProgressMain = require('components/personal/progress-main'),
      mRechargeMain = require('components/personal/recharge-main'),
      mPurchaseMain = require('components/personal/purchase-main'),
      mPreferentialMain = require('components/personal/preferential-main'),
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
        // console.log(success);
        oUserData = success.data[0].user;
        // 重新组织列表的数据
        var sideData = mData.regroupSidebar(oUserData,sHash);
        // 渲染侧导航
        document.getElementById('sidebar').innerHTML = tplSidebar(sideData);

        // 绑定按钮事件
        $('.menu-list').on('click', '.menu-list-link', function(event) {
          $('.menu-list').find('a').removeClass('active');
          var sHref = $(this).addClass('active').attr('href');
          var sRoute = mUtil.getHash(sHref);

          // 侧导航按钮切换主内容
          fnLoadMain(oUserData,sRoute);
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
          // 加载学习进度的内容
          mProgressMain.loadContent(token);
          break;
        case '#recharge-records':
          // 加载充值记录
          mRechargeMain.loadContent(userData,token);
          break;
        case '#purchase-records':
          // 加载购买记录
          mPurchaseMain.loadContent(userData,token);
          break;
        case '#preferential':
          // 加载优惠信息
          mPreferentialMain.loadContent(userData,token);
          break;
        default:
          mAccountMain.loadContent(oUserData,token);
      }
    }

    // 检测到未登录状态，执行退出方法，并弹出登录对话框。
    if (!mAuth.isAuthenticated()) {
      // 登录失效时
      // token过期自动登出
      mAuth.logout();
      // 同时弹出登录对话框
      mSignModal.showModal();
    }

  });
});
