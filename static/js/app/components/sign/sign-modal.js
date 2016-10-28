/**
 * 登录模态框模块
 * 1.绑定显示模态框的事件
 * 2.显示模态框
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mAuth = require('components/sign/auth');
  var tplSignAppend = require('tpl/public/sign-append');
  var oSignModal = {};

  var eModal, eFrame, oFrameWin;

  oSignModal.showModal = function (path) {
    // 设置模态框默认显示登录窗口
    var sPath = !!path ? path : 'login';
    // 获取登录模态框的HTML（iframe）
    var sModalHTML = tplSignAppend();
    // 插入HTML，避免重复创建
    if (!eModal) {
      $('body').append(sModalHTML);
      // 获取 模态框对象
      eModal = document.getElementById('sign-modal');
      // 获取到插入的iframe元素对象
      eFrame = eModal.getElementsByTagName('iframe');
      // 获取到创建的子窗口的window对象
      oFrameWin = eFrame[0].contentWindow;
      // 创建监听事件，监听模态框隐藏
      $(eModal).on('hidden.bs.modal', function (eve) {
        eve.preventDefault();
        // 窗口关闭后，判断是否登录成功
        // 登录成功后，登录窗口会把token传递到调用登录窗口的页面（当前页面），通过globalModule获取token
        var sToken = globalModule.getToken();
        // 获取URL的路径部分，作为跳转的判断
        var sPathname = window.location.pathname;
        // 调用login方法
        if (sToken) {
          mAuth.login(sToken);
        } else if (!mAuth.isLogined() && sPathname === '/personal-center.html') {
          // 当登录状态失效，同时页面处在用户中心时，关闭登录窗口强制页面自动跳转到首页
          window.location.href = mUtil.getSkipUrl('/index.html');
        }
      });
    }
    // 设置src属性
    eFrame[0].src = 'login-angular.html#/' + sPath;
    // 监听onload事件，判断iframe中的页面加载完毕
    // 加载完成后，显示模态框
    if (eFrame[0].attachEvent) {
      eFrame[0].attachEvent('onload', function () {
        $(eModal).modal('show', 'handleUpdate');
      });
    } else {
      eFrame[0].onload = function () {
        $(eModal).modal('show', 'handleUpdate');
      };
    }
  };
  oSignModal.bindModal = function (btn) {
    btn.on('click', function (eve) {
      eve.preventDefault();
      var jqBtn = $(this);
      oSignModal.showModal(jqBtn.data('whatever'));
    });
  };
  return oSignModal;
});
