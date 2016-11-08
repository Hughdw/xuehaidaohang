/**
 * 课程详情主文件
 * 1.加载模块
 * 2.课程详情 的程序逻辑
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
    var nUid, sTit, sSubtit;
    // 获取视频PID
    var nPid = mUtil.getQueryString('pid');
    // 向auth模块中加入视频的登录和登出方法。
    mAuth.addNoticeList(
      function () {
        oLoadVideo.logined(nUid, mSession.getToken());
      },
      function () {
        $('#firstBt').off().hide();
        oLoadVideo.notLogin();
      }
    );

    // 添加alert模块需要的HTML
    $('body').prepend(tplAlert);

    // 加载购物车
    mShoppingOperation.loadMiniCart(function () {
      // 绑定按钮事件
      mDropdownMenu.handle('#sc-btn', '.shopping-car');
      mShoppingOperation.showEmptyBg();
    });

    // 渲染 加入购物车 按钮（目前接口没有返回价格，价格暂时是常量）
    document.getElementById('buy-content').innerHTML = tplBuy();
    $('#add-to-cart').on('click', function (event) {
      event.preventDefault();
      var jqSelf = $(this).button('loading');
      mShoppingOperation.add(nPid, sTit, sSubtit, function () {
        mAlert.success('加入成功');
        jqSelf.button('reset');
      });
    });


    // 渲染模板和绑定事件
    function fnLoadContent (data) {
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

      // 点击下拉列表元素，切换课程
      jqTmList.delegate('a.tm-panel-item', 'click', function (event) {
        event.preventDefault();
        var nPid = $(this).data('id');
        var sSearch = window.location.search.replace(/[^=]+$/, nPid);
        window.location.search = sSearch;
      });
      mDropdownMenu.handle('#tm-btn', '.tit-master');
    }

    // 加载视频信息
    var oLoadVideo = {
      // 已登录加载视频详情
      logined: function (nUid_, token_) {
        // 获取视频详情
        mApi.getproduct(nPid, nUid_)
          .done(function (success) {
            fnLoadContent(success.data[0]);
            // 初始化播放器
            mVideoPlay.init('play-box', success.data[0], token_);
          })
          .fail(function (error) {
            console.log(error);
          });
      },
      // 未登录加载视频详情
      notLogin: function () {
        // 获取视频详情
        mApi.getproduct(nPid)
          .done(function (success) {
            fnLoadContent(success.data[0]);
            // 初始化播放器
            mVideoPlay.init('play-box', success.data[0]);
          })
          .fail(function (error) {
            console.log(error);
          });
      }
    };

    // 获取用户信息
    if (mAuth.isLogined()) {
      var sToken = mSession.getToken();
      // 获取用户信息
      mApi.getAuthUser(sToken)
        .done(function (success) {
          nUid = success.data[0].user.id;
          oLoadVideo.logined(nUid, sToken);
        })
        .fail(function () {
          // token过期自动登出
          mAuth.logout();
        });
    } else {
      oLoadVideo.notLogin();
    }

    // 绑定 TAG切换事件。
    $('#sidebar-tabs').on('click', '.sidebar-tab', function (event) {
      $(this).tab('show');
    });
  });
});
