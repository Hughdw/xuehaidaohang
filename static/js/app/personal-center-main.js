/**
 * 用户中心主文件
 */

define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mApi = require('components/api'); // 与后台交互API
  var mAuth = require('components/sign/auth'); // 登录状态管理
  var mSession = require('components/sign/session');
  var mSignModal = require('components/sign/sign-modal');
  var mRegroupData = require('components/personal/regroup-data');
  // 用户中心的二级页面js文件
  var mAccountMain = require('components/personal/account-main');
  var mProgressMain = require('components/personal/progress-main');
  var mRechargeMain = require('components/personal/recharge-main');
  var mPurchaseMain = require('components/personal/purchase-main');
  var mPreferentialMain = require('components/personal/preferential-main');
  var tplAlert = require('tpl/public/components-alert');
  var tplSidebar = require('tpl/personal/sidebar');
  $(function () {
    // 向auth模块中加入导航的登录/登出方法。
    mAuth.addNoticeList(
      function () {
        fnLoadSidebar();
      },
      function () {

      }
    );

    // 添加alert模块需要的HTML
    $('body').prepend(tplAlert);

    // 共用的用户信息
    var oUserData;

    // 加载侧导航
    function fnLoadSidebar () {
      var sHash = location.hash;
      var token = mSession.getToken();
      // 获取用户信息，加载侧导航
      mApi.getAuthUser(token)
      .done(function (success) {
        // console.log(success);
        oUserData = success.data[0].user;
        // 重新组织列表的数据
        var sideData = mRegroupData.sidebar(oUserData, sHash);
        // 渲染侧导航
        document.getElementById('sidebar').innerHTML = tplSidebar(sideData);

        // 绑定按钮事件
        $('.menu-list').on('click', '.menu-list-link', function (event) {
          $('.menu-list').find('a').removeClass('active');
          var sHref = $(this).addClass('active').attr('href');
          var sRoute = mUtil.getHash(sHref);

          // 侧导航按钮切换主内容
          fnLoadMain(oUserData, sRoute);
        });
        // 加载完侧导航，加载主内容
        fnLoadMain(oUserData, sHash);
      })
      .fail(function () {
        // token过期自动登出
        mAuth.logout();
        // 同时弹出登录对话框
        mSignModal.showModal();
      });
    }
    // 加载内容区域
    function fnLoadMain (userData, route) {
      var token = mSession.getToken();
      // 渲染个人中心不同页面的数据
      switch (route) {
        case '#account':
          // 加载用户资料的内容
          mAccountMain.loadContent(userData, token);
          break;
        case '#progress':
          // 加载学习进度的内容
          mProgressMain.loadContent(token);
          break;
        case '#recharge-records':
          // 加载充值记录
          mRechargeMain.loadContent(userData, token);
          break;
        case '#purchase-records':
          // 加载购买记录
          mPurchaseMain.loadContent(userData, token);
          break;
        case '#preferential':
          // 加载优惠信息
          mPreferentialMain.loadContent(userData, token);
          break;
        default:
          mAccountMain.loadContent(oUserData, token);
      }
    }

    // 检测到未登录状态，执行退出方法，并弹出登录对话框。
    if (!mAuth.isLogined()) {
      // 登录失效时
      // token过期自动登出
      mAuth.logout();
      // 同时弹出登录对话框
      mSignModal.showModal();
    }
  });
});
