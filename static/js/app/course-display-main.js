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
  var mBindDropdown = require('components/dropdown');
  var mVideoPlay = require('components/course/video-play');
  var tplTitle = require('tpl/course/display-title');
  var tplSidebar = require('tpl/course/display-sidebar');
  $(function () {
    var uid;
    // 获取视频PID
    var nPid = mUtil.getQueryString('pid');
    // 向auth模块中加入视频的登录和登出方法。
    mAuth.addNoticeList(
      function () {
        oLoadVideo.logined(uid, mSession.getToken);
      },
      function () {
        $('#firstBt').off().hide();
        oLoadVideo.notLogin();
      }
    );

    // 注册购物车下拉事件的目标元素和父级元素
    mBindDropdown.reg('#sc-btn', '.shopping-car');
    // 注册标题下拉事件的目标元素和父级元素
    mBindDropdown.reg('#tm-btn', '.tit-master');

    // 渲染模板和绑定事件
    function fnLoadContent (data) {
      // 渲染标题的模板
      document.getElementById('title').innerHTML = tplTitle(data);
      // 渲染侧栏的模板
      document.getElementById('tab-content').innerHTML = tplSidebar(data);

      mBindDropdown.bind('#tm-btn', function () {
        // 点击下拉列表元素，切换浏览器URL中的pid
        $('#tm-list').on('click', '.tm-panel-item', function (event) {
          event.preventDefault();

          var nPid = $(this).data('id');
          var sSearch = window.location.search.replace(/[^=]+$/, nPid);
          window.location.search = sSearch;
        });
      });
    }
    // 加载视频信息
    var oLoadVideo = {
      // 已登录加载视频详情
      logined: function (nUid, token) {
        // 获取视频详情
        mApi.getproduct(nPid, nUid)
          .done(function (success) {
            fnLoadContent(success.data[0]);
            // 初始化播放器
            mVideoPlay.init('play-box', success.data[0], token);
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
      var token = mSession.getToken;
      // 获取用户信息
      mApi.getAuthUser(token)
        .done(function (success) {
          uid = success.data[0].user.id;
          oLoadVideo.logined(uid, token);
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
