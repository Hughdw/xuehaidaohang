
/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.code课程列表 的程序逻辑
 */
define(function (require) {
  var $ = require('jquery'),
      mApi = require('./components/api'),
      mResetMenu = require('./components/course/reset-menu'),
      mBindDropdown = require('./components/dropdown'),
      tplListMenu = require('tpl/course/list-menu'),
      mListData = require('./components/course/list-data'),
      mFilterCont = require('./components/course/filter-cont');
  // 页面载入
  $(function() {
    // 保存用户选择的目录选线
    var aSelectedName;
    // 获取视频目录列表
    mApi.getcategory()
    .done(function(success) {
      // 重新组织数据
      var oMenuData = mListData.regroupMenu(success.data);
      // 将渲染好的HTML填充到页面中
      document.getElementById('gps-menu').innerHTML = tplListMenu(oMenuData);
      // 重置 筛选列表 的高度
      mResetMenu('tab-content');
      // 为目录绑定事件（包括基础和提高）
      mFilterCont.bindEvt([1,2]);
      // 默认内容
      mFilterCont.getProductlist(mListData.getSelectedName(),1);
    })
    .fail(function(error) {
      alert('服务器请求错误');
    });
    // 购物车下拉事件
    mBindDropdown.init('#sc-btn','.shopping-car',true);


  });
});
