/**
 * @title 课程详情主文件
 * @fileOverView 本文件是课程详情页面的入口文件，用于引入并使用相关功能模块。
 * @author whdstyle@gmail.com
 */
define(function (require) {
  var $ = require('jquery');
  var mUtil = require('components/util');
  var mAuth = require('components/sign/auth');
  var mSession = require('components/sign/session');
  var mApi = require('components/api');
  var mDropdownMenu = require('components/dropdown');
  var mVideoPlay = require('components/course/video-play');
  var mShoppingOperation = require('components/shoppingcart/operation');
  var mAlert = require('components/alert');
  var tplAlert = require('tpl/public/components-alert');
  var tplTitle = require('tpl/course/display-title');
  var tplSidebar = require('tpl/course/display-sidebar');
  var tplBuy = require('tpl/course/display-buy');
  $(function () {
   // ************************************
   // 声明
   // ************************************
    // 视频的标题
    var sTit, sSubtit;

   // ************************************
   // 通用
   // ************************************
    // 向auth模块中加入视频的登录和登出方法。
    mAuth.addNoticeList(
      function () {
        var sToken = mSession.getToken();
        mApi.getAuthUser(sToken)
        .done(function (success) {
          oLoadVideo.logined(success.data[0].user.id, sToken);
        })
        .fail(function (error) {
          alert(error);
        });
      },
      function () {
        $('#firstBt').off().hide();
        oLoadVideo.notLogin();
      }
    );

    // 加载视频信息
    var oLoadVideo = {
      // 已登录加载视频详情
      logined: function (uid, token) {
        var nPid = mUtil.getQueryString('pid');
        // 获取视频详情
        mApi.getProductDetails(nPid, uid)
          .done(function (success) {
            loadContent(success.data[0]);
            // 初始化播放器
            mVideoPlay('play-box', success.data[0], token);
          })
          .fail(function (error) {
            alert(error);
          });
      },
      // 未登录加载视频详情
      notLogin: function () {
        var nPid = mUtil.getQueryString('pid');
        // 获取视频详情
        mApi.getProductDetails(nPid)
          .done(function (success) {
            loadContent(success.data[0]);
            // 初始化播放器
            mVideoPlay('play-box', success.data[0]);
          })
          .fail(function (error) {
            alert(error);
          });
      }
    };

    // 渲染模板和绑定事件
    function loadContent (data) {
      // 渲染标题的模板
      document.getElementById('title').innerHTML = tplTitle(data);
      sTit = data.num;
      sSubtit = data.title;
      // 渲染侧栏的模板
      document.getElementById('tab-content').innerHTML = tplSidebar(data);

      var jqTmList = $('#tm-list');
      var jqTmBtn = $('#tm-btn');
      // 为PC端设置按钮和下拉列表相同的宽度。
      var nTmListWidth = jqTmList.innerWidth();
      var nTmBtnWidth = jqTmBtn.innerWidth();
      if (mUtil.isPC) {
        if (nTmListWidth > nTmBtnWidth) {
          jqTmBtn.css('width', '100%');
        } else {
          jqTmList.css('width', '100%');
        }
      }

      // 下拉列表，切换课程
      jqTmList.delegate('a.tm-panel-item', 'click', function (event) {
        event.preventDefault();
        var nID = $(this).data('id');
        var sSearch = window.location.search.replace(/[^=]+$/, nID);
        window.location.search = sSearch;
      });
      mDropdownMenu('#tm-btn', '.tit-master');
    }

    // 添加alert模块需要的HTML
    $('body').prepend(tplAlert);

   // ************************************
   // 功能
   // ************************************
    // 未登录时，加载视频
    mAuth.isLogined() || oLoadVideo.notLogin();

    // 加载购物车
    mShoppingOperation.loadMiniCart(function () {
      // 绑定按钮事件
      mDropdownMenu.handle('#sc-btn', '.shopping-car');
      mShoppingOperation.switchEmptyBg();
    });

    // 加载 加入购物车（目前接口没有返回价格，价格暂时是常量）
    // 渲染 加入购物车
    document.getElementById('buy-content').innerHTML = tplBuy();
    $('#add-to-cart').on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this).button('loading');
      var nPid = mUtil.getQueryString('pid');
      mShoppingOperation.add(nPid, sTit, sSubtit, function () {
        mAlert.success('加入成功');
        jqSelf.button('reset');
      });
    });

    // 侧导航TAB切换。
    $('#sidebar-tabs').on('click', '.sidebar-tab', function (event) {
      event.preventDefault();
      $(this).tab('show');
    });
  });
});
