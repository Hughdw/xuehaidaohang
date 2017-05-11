/**
 * @title 课程列表主文件
 * @fileOverView 本文件是课程列表页面的入口文件，用于引入并使用相关功能模块。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mApi = require('components/api');
  var mResetMenu = require('components/course/reset-menu');
  var mDropdownMenu = require('components/dropdown');
  var mListData = require('components/course/list-data');
  var mFilterCont = require('components/course/filter-cont');
  var mShoppingOperation = require('components/shoppingcart/operation');
  var mAlert = require('components/alert');
  var tplAlert = require('tpl/public/components-alert');
  var tplListMenu = require('tpl/course/list-menu');
  $(function () {
   // ************************************
   // 通用
   // ************************************
    // 添加alert模块需要的HTML
    $('body').prepend(tplAlert);

   // ************************************
   // 功能
   // ************************************
    // 加载购物车
    mShoppingOperation.loadMiniCart(function () {
      // 绑定按钮事件
      mDropdownMenu('#sc-btn', '.shopping-car');
      mShoppingOperation.switchEmptyBg();
    });

    // 筛选结果增加 加入购物车 功能
    $('#list-cont').delegate('button', 'click', function (event) {
      // 添加到购物车
      var jqSelf = $(this);
      var nPid = jqSelf.data('pid');
      var jqVideo = $('#video-id-' + nPid);
      var sTit = jqVideo.find('.rp-tit').text();
      var sSubtit = jqVideo.find('.rp-subtit').text();

      jqSelf.button('loading');
      mShoppingOperation.add(nPid, sTit, sSubtit, function () {
        mAlert.success('加入成功');
        jqSelf.button('reset');
      });
    });

    // 加载目录
    // 获取筛选目录列表数据
    mApi.getCategory()
    .done(function (success) {
      // 重新组织数据
      var oMenuData = mListData.regroupMenu(success.data);
      // 将渲染好的HTML填充到页面中
      document.getElementById('gps-menu').innerHTML = tplListMenu(oMenuData);
      // 重置 筛选列表 的高度
      mResetMenu('tab-content');

      // 当前目录选择项目的categoryid
      var nLevelActiveId = mListData.getLevelActiveId();
      // 为目录绑定事件（包括基础和提高）
      mFilterCont.bindEvt(nLevelActiveId);
      // 视频列表默认内容
      mFilterCont.getProductList(mListData.getSelectedName(nLevelActiveId), 1);// 目前只有 基础 - 小一 - 数学 - 人教版 - 重点有数据。
    })
    .fail(function (error) {
      alert(error);
    });
  });
});
