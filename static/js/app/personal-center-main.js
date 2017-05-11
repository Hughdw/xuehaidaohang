/**
 * @title 用户中心主文件
 * @fileOverView 本文件是用户中心的入口文件，用于加载侧导航和切换二级页面的内容到主区域。
 * @other 不同条件下页面的处理逻辑：
 * 1.登录状态下 -> 退出
 *  d.跳转到指定页面（首页）
 * 2.登录状态下 -> 登录失效
 *  a.注销登录
 *  b.消除DOM
 *  c.弹出登录对话框
 * 3.未登录状态下 -> 进入用户中心
 *  c.弹出登录对话框
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mApi = require('components/api');
  var mAuth = require('components/sign/auth');
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
   // ************************************
   // 声明
   // ************************************
    // 共用的用户信息
    var oUserData;

   // ************************************
   // 通用
   // ************************************
    // 向 auth 模块中加入导航的 登录/登出 的状态更新。
    mAuth.addNoticeList(
      function () {
        loadSidebar();
      },
      function () {
        window.location.href = mUtil.getSkipUrl('/index.html');
      }
    );

    // 添加alert模块需要的HTML
    $('body').prepend(tplAlert);

    // 移除 侧导航 和 内容区域 的DOM
    function removeSidebarAndMain () {
      $('#sidebar').empty();
      $('#mainbar').empty();
    }

    // 加载侧导航
    function loadSidebar () {
      var sHash = location.hash;
      var sToken = mSession.getToken();
      // 获取用户信息，加载侧导航
      mApi.getAuthUser(sToken)
      .done(function (success) {
        oUserData = success.data[0].user;
        // 重新组织列表的数据
        var sideData = mRegroupData.sidebar(oUserData, sHash);
        // 渲染侧导航
        document.getElementById('sidebar').innerHTML = tplSidebar(sideData);

        // 侧导航切换主区域内容，同时更新URL中的Hash
        $('.menu-list').on('click', '.menu-list-link', function (event) {
          event.preventDefault();
          $('.menu-list').find('a').removeClass('active');
          var sHref = $(this).addClass('active').attr('href');
          var sRoute = location.hash = mUtil.getHash(sHref);
          // 侧导航按钮切换主内容
          loadMain(oUserData, sRoute);
        });
        // 加载完侧导航，加载主内容
        loadMain(oUserData, sHash);
      })
      .fail(function () {
        // 登录状态下，登录失效
        // 1.注销登录
        // 2.消除DOM
        // 3.弹出对话框
        mSession.destroyUser();
        removeSidebarAndMain();
        mSignModal.showModal();
      });
    }
    // 加载内容区域
    function loadMain (userData, route) {
      console.log(route);
      var sToken = mSession.getToken();
      // 渲染个人中心不同页面的数据
      switch (route) {
        case '#account':
          // 加载用户资料的内容
          mAccountMain(userData, sToken);
          break;
        case '#progress':
          // 加载学习进度的内容
          mProgressMain(sToken);
          break;
        case '#recharge-records':
          // 加载充值记录
          mRechargeMain(userData, sToken);
          break;
        case '#purchase-records':
          // 加载购买记录
          mPurchaseMain(userData, sToken);
          break;
        case '#preferential':
          // 加载优惠信息
          mPreferentialMain(userData, sToken);
          break;
        default:
          mAccountMain(oUserData, sToken);
      }
    }

   // ************************************
   // 功能
   // ************************************
    // 页面载入，未登录状态，并弹出登录对话框。
    // mAuth.isLogined()返回false，代表Cookie中的token已经被注销，所以只需要弹出对话框即可。
    mAuth.isLogined() || mSignModal.showModal();
  });
});
