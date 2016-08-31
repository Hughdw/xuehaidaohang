/**
 * define函数用来定义模块
 * 1.加载模块
 * 2.课程列表 的程序逻辑
 */
define(function (require) {
  var $ = require('jquery'),
      mApi = require('components/api'),
      mResetMenu = require('components/course/reset-menu'),
      mBindDropdown = require('components/dropdown'),
      tplListMenu = require('tpl/course/list-menu'),
      mListData = require('components/course/list-data'),
      mFilterCont = require('components/course/filter-cont'),
      mAuth = require('components/sign/auth'),
      mShoppingOperation = require('components/shoppingcart/operation');
  // 页面载入
  $(function() {
    // 1.注册购物车下拉事件的目标元素和父级元素
    mBindDropdown.reg('#sc-btn','.shopping-car');

    // 加载购物车
    mShoppingOperation.loadMiniCart(function() {
      // 2.绑定按钮事件
      mBindDropdown.bind('#sc-btn');
      mShoppingOperation.showEmptyBg();
    });

    // 给筛选出的结果选项 委派 点击事件
    $('#list-cont').delegate('button', 'click', function(event) {
      // 添加到购物车
      var nPid = $(this).data('pid'),
          jqVideo = $('#video-'+nPid);
      var sTit = jqVideo.find('.rp-tit').text(),
          sSubtit = jqVideo.find('.rp-subtit').text();
      mShoppingOperation.add(nPid,sTit,sSubtit,1);
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

  });
});
