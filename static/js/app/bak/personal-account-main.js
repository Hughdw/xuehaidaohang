/**
 * @title 原账户资料页面主文件
 * @fileOverView 由于并入personal-center-main.js，因此此文件遗弃。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery'),
      mApi = require('components/api'),
      mAuth = require('components/sign/auth'),
      mSession = require('components/sign/session'),
      mSignModal = require('components/sign/sign-modal'),
      mRegroupData = require('components/personal/regroup-data'),
      tplSidebar = require('tpl/personal/sidebar'),
      tplAccountMain = require('tpl/personal/account-main'),
      mButton = require('components/personal/button');
  $(function() {
    // 需要向 auth模块中添加登录/登出方法。


    // 已登录状态
    if (mAuth.isLogined()) {
      var token = mSession.getToken();
      // 获取用户信息
      mApi.getAuthUser(token)
      .done(function(success) {
        // 重新组织列表的数据
        var sideData = mRegroupData.sidebar(success.data[0]);
        document.getElementById('sidebar').innerHTML = tplSidebar(sideData);

        var mainData = mRegroupData.account(success.data[0],0);
      })
      .fail(function(error) {
        // token过期自动登出
        mAuth.logout();
        // 同时弹出登录对话框
        mSignModal.showModal();
      });
    } else {
      // token过期自动登出
      mAuth.logout();
      // 同时弹出登录对话框
      mSignModal.showModal();
    }

    // 用户是否已经设置或绑定了对应资料
    var oSetDone = {
      'avatar':null,
      'nickname':null,
      'password':null,
      'mobile':true,
      'email':false
    };
    // tpldata.sidebar.activeMenu = 0;//设置激活导航
    // 获取到模版，然后渲染数据
    // 将选好数据的字符串通过 innerHTML 插入到指定的元素中（#main）
    // document.getElementById('mainbar').innerHTML = tplAccountMain(tpldata);
    // document.getElementById('sidebar-cont').innerHTML =
    // document.getElementById('main').innerHTML = template('personal/account-main',tpldata);


    // 折叠版块事件绑定
    // 头像
    mButton.bindEvent('#collapse-link-avatar','#collapse-avatar',oSetDone.avatar);
    // 昵称
    mButton.bindEvent('#collapse-link-nickname','#collapse-nickname',oSetDone.nickname);
    // 登录密码
    mButton.bindEvent('#collapse-link-password','#collapse-password',oSetDone.password);
    // 绑定手机
    mButton.bindEvent('#collapse-link-mobile','#collapse-mobile',oSetDone.mobile);
    // 绑定邮箱
    mButton.bindEvent('#collapse-link-email','#collapse-email',oSetDone.email);


  });
});
