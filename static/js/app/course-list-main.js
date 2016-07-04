/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.课程列表 的程序逻辑
 */
define(function (require) {
  var mApi = require('components/api'),
      mResetMenu = require('components/course/reset-menu'),
      mBindDropdown = require('components/dropdown'),
      tplListMenu = require('tpl/course/list-menu'),
      mListData = require('components/course/list-data'),
      mFilterCont = require('components/course/filter-cont'),
      mAuth = require('components/sign/auth');
  // 页面载入
  $(function() {

    // 测试登录状态
    $('#testBtn').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      console.log(mAuth.isAuthenticated());
    });
    // 退出
    $('#testBtn2').on('click', function(event) {
      event.preventDefault();
      /* Act on the event */
      mAuth.logout();
    });

    // 获取视频目录列表
    mApi.getcategory()
    .done(function(success) {
      // 重新组织数据
      var oMenuData = mListData.regroupMenu(success.data);
      // 将渲染好的HTML填充到页面中
      document.getElementById('gps-menu').innerHTML = tplListMenu(oMenuData);
      // 重置 筛选列表 的高度
      mResetMenu('tab-content');
      // 当前目录选择项目的categoryid
      var nLevelActiveId = mListData.getLevelActiveId();
      // 为目录绑定事件（包括基础和提高）
      mFilterCont.bindEvt([1,2],nLevelActiveId);
      // 视频列表默认内容
      mFilterCont.getProductlist(mListData.getSelectedName(nLevelActiveId),1);
    })
    .fail(function(error) {
      alert('服务器请求错误');
    });
    // 购物车下拉事件
    mBindDropdown.init('#sc-btn','.shopping-car',true);
  });
});
